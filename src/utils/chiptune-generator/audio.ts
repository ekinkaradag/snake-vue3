/*
  Copyright 2020 David Whiting
  This work is licensed under a Creative Commons Attribution 4.0 International License
  https://creativecommons.org/licenses/by/4.0/
*/
import { fill, rnd } from "./utils";

const A3Frequency = 440;
const A0Frequency = A3Frequency / 8;

function gainNode(
  audioContext: AudioContext,
  gainAmount: number = 0
): GainNode {
  const node = audioContext.createGain();
  node.gain.value = gainAmount;
  return node;
}

function Audio(audioContext: AudioContext) {
  function oscillatorNode(
    type: OscillatorType,
    freq: number = 440
  ): OscillatorNode {
    const node = audioContext.createOscillator();
    node.type = type;
    node.frequency.value = freq;
    return node;
  }
  function waveShaperNode(curve: Float32Array | number[]): WaveShaperNode {
    const node = audioContext.createWaveShaper();
    node.curve = new Float32Array(curve);
    return node;
  }

  function stereoPannerNode(pan: number): StereoPannerNode {
    if (audioContext.createStereoPanner) {
      const node = audioContext.createStereoPanner();
      node.pan.value = pan;
      return node;
    } else {
      const node = audioContext.createPanner();
      node.panningModel = "equalpower";
      node.setPosition(pan, 0, 0.5);
      // @ts-ignore
      node.pan = node.positionX;
      return node as AudioNode as StereoPannerNode;
    }
  }

  function SquareSynth(pan: number = 0): Synth<Note> {
    const set = (a: AudioParam, v: number) => {
      a.cancelScheduledValues(audioContext.currentTime);
      a.setValueAtTime(v, audioContext.currentTime);
    };
    const towards = (a: AudioParam, v: number, t: number) => {
      a.setTargetAtTime(t, audioContext.currentTime, t);
    };
    const slide = (a: AudioParam, v: number, t: number) => {
      a.cancelScheduledValues(audioContext.currentTime);
      a.setTargetAtTime(v, audioContext.currentTime, t);
    };

    const wavetableTrigger = oscillatorNode("sawtooth"),
      pulseWavetable = waveShaperNode(
        new Float32Array(256).fill(-1, 0, 128).fill(1, 128, 256)
      ),
      alwaysOneWavetable = waveShaperNode(new Float32Array(2).fill(1, 0, 2)),
      wavetableOffsetGain = gainNode(audioContext),
      pulseOutputGain = gainNode(audioContext),
      outputPanner = stereoPannerNode(pan);
    wavetableTrigger.start();
    wavetableTrigger.connect(pulseWavetable);
    wavetableTrigger.connect(alwaysOneWavetable);
    alwaysOneWavetable.connect(wavetableOffsetGain);
    wavetableOffsetGain.connect(pulseWavetable);
    pulseWavetable.connect(pulseOutputGain);
    pulseOutputGain.connect(outputPanner);
    outputPanner.connect(audioContext.destination);

    const freq = wavetableTrigger.frequency,
      width = wavetableOffsetGain.gain,
      gain = pulseOutputGain.gain;

    const decay = 0.04,
      sustain = 0.7,
      release = 0.01,
      level = 0.1;

    function noteOn(note: number, glide: number = 0) {
      const glideTime = glide / 10;
      slide(freq, A0Frequency * 2 ** (note / 12), glideTime);
      set(gain, level);
      towards(gain, level * sustain, decay);
    }
    function noteOff() {
      slide(gain, 0, release);
    }
    function play(note: Note) {
      if (note.note === "---") {
        noteOff();
      } else if (note.note === "cont") {
        // do nothing
      } else {
        noteOn(note.note, note.fx?.glide);
      }
      set(width, note.fx?.pulseWidth ?? 0.0);
    }

    return { play };
  }

  function DrumSynth(): Synth<Drum> {
    const toneOscillator = oscillatorNode("square", 55),
      toneGain = gainNode(audioContext),
      noiseWavetableTrigger = oscillatorNode("sawtooth", 20),
      noiseWavetable = waveShaperNode(fill(1024, (x) => rnd() * 2 - 1)),
      noiseGain = gainNode(audioContext),
      noisePan = stereoPannerNode(0);

    toneOscillator.start();
    noiseWavetableTrigger.start();

    toneOscillator.connect(toneGain);
    toneGain.connect(audioContext.destination);

    noiseWavetableTrigger.connect(noiseWavetable);
    noiseWavetable.connect(noiseGain);
    noiseGain.connect(noisePan);
    noisePan.connect(audioContext.destination);

    function play(slot: Drum) {
      const vel = slot.vel ? slot.vel : 1;
      if (slot.drum === "KCK") {
        toneOscillator.detune.cancelScheduledValues(audioContext.currentTime);
        toneOscillator.detune.setValueAtTime(3000, audioContext.currentTime);
        toneOscillator.detune.setTargetAtTime(
          0,
          audioContext.currentTime,
          0.07
        );
        toneGain.gain.cancelScheduledValues(audioContext.currentTime);
        toneGain.gain.setValueAtTime(0.2 * vel, audioContext.currentTime);
        toneGain.gain.setValueCurveAtTime(
          new Float32Array([0.2 * vel, 0.2 * vel, 0.13 * vel, 0.05 * vel, 0.0]),
          audioContext.currentTime,
          0.1
        );
      } else if (slot.drum === "NSS") {
        noiseGain.gain.cancelScheduledValues(audioContext.currentTime);
        noiseGain.gain.setValueAtTime(0.1 * vel, audioContext.currentTime);
        noiseGain.gain.setValueCurveAtTime(
          new Float32Array([0.1 * vel, 0.04 * vel, 0.0]),
          audioContext.currentTime,
          0.08
        );

        // Ugly workaround for Safari
        if ("pan" in noisePan) {
          noisePan.pan.cancelScheduledValues(audioContext.currentTime);
          noisePan.pan.setValueAtTime(
            rnd() * 0.4 - 0.2,
            audioContext.currentTime
          );
        }
      } else if (slot.drum === "SNR") {
        toneOscillator.detune.cancelScheduledValues(audioContext.currentTime);
        toneOscillator.detune.setValueAtTime(2400, audioContext.currentTime);
        toneOscillator.detune.setTargetAtTime(
          600,
          audioContext.currentTime,
          0.04
        );
        toneGain.gain.cancelScheduledValues(audioContext.currentTime);
        toneGain.gain.setValueAtTime(0.15 * vel, audioContext.currentTime);
        toneGain.gain.setValueCurveAtTime(
          new Float32Array([0.15 * vel, 0.05 * vel, 0.01 * vel, 0]),
          audioContext.currentTime,
          0.1
        );
        noiseGain.gain.cancelScheduledValues(audioContext.currentTime);
        noiseGain.gain.setValueAtTime(0.2 * vel, audioContext.currentTime);
        noiseGain.gain.setValueCurveAtTime(
          new Float32Array([0.2 * vel, 0.15 * vel, 0.0]),
          audioContext.currentTime,
          0.15
        );
      }
    }
    return {
      play,
    };
  }
  return {
    SquareSynth,
    DrumSynth,
    setVolume: gainNode,
  };
}

export default Audio;
