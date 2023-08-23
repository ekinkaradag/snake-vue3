/*
  Copyright 2020 David Whiting
  This work is licensed under a Creative Commons Attribution 4.0 International License
  https://creativecommons.org/licenses/by/4.0/
*/

import { choose, rndInt, rnd, seedRNG } from "./utils";

import Audio from "./audio";
import * as music from "./theory";
import * as Generators from "./generators";

const PatternSize = 64;

const progressions = [
  [1, 1, 1, 1, 6, 6, 6, 6, 4, 4, 4, 4, 3, 3, 5, 5],
  [1, 1, 1, 1, 6, 6, 6, 6, 1, 1, 1, 1, 6, 6, 6, 6],
  [4, 4, 4, 4, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 3, 3],
  [1, 1, 6, 6, 4, 4, 5, 5, 1, 1, 6, 6, 3, 3, 5, 5],
  [5, 5, 4, 4, 1, 1, 1, 1, 5, 5, 6, 6, 1, 1, 1, 1],
  [6, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 5, 5, 5, 5],
  [1, 1, 1, 1, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5],
  [6, 6, 6, 6, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 5, 5],
  [1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4],
];

type FourChannelsPlusDrums = [Note, Note, Note, Note, Drum];
type PatternsType<T> = { [K in keyof T]: Pattern<T[K]> };
type SynthsType<T> = { [K in keyof T]: Synth<T[K]> };

interface State {
  key: Key;
  scale: Scale;
  progression: Progression;
  bpm: number;
  songIndex: number;
  seedCode: string;
}

function hex(v: number) {
  return Math.floor(v).toString(16).toUpperCase().padStart(2, "0");
}

function bpmClock() {
  let intervalHandle = {
    bpmClock: 0,
  };
  let fN = 0;
  function set(bpm: number, frameFunction: (f: number) => void) {
    window.clearInterval(intervalHandle.bpmClock);
    intervalHandle.bpmClock = window.setInterval(
      () => frameFunction(fN++),
      60000 / bpm / 4
    );
  }
  return {
    set,
  };
}

function createInitialState(seed: string): State {
  seedRNG(seed && seed.length > 0 ? seed : "" + Math.random());
  return {
    key: rndInt(12) as Key,
    scale: music.scales.minor,
    progression: progressions[0],
    bpm: 112,
    seedCode: createSeedCode(),
    songIndex: 0,
  };
}

function createSeedCode() {
  return (
    hex(rndInt(255)) + hex(rndInt(255)) + hex(rndInt(255)) + hex(rndInt(255))
  );
}

function mutateState(state: State): void {
  state.songIndex++;
  if (state.songIndex % 8 === 0) {
    state.bpm = Math.floor(rnd() * 80) + 100;
    //clock.set(state.bpm, frame);
  }
  if (state.songIndex % 4 === 0) {
    [state.key, state.scale] = music.modulate(state.key, state.scale);
  }
  if (state.songIndex % 2 === 0) {
    state.progression = choose(progressions);
  }
  state.seedCode =
    hex(rndInt(255)) + hex(rndInt(255)) + hex(rndInt(255)) + hex(rndInt(255));
  seedRNG(state.seedCode);

  //display.setPatterns(patterns, stateString);
}

function start(audioContext: AudioContext) {
  const state: State = createInitialState("snake");

  let patterns = [[], [], [], [], []] as PatternsType<FourChannelsPlusDrums>;

  const clock = bpmClock();

  const au = Audio(audioContext);

  const synths: SynthsType<FourChannelsPlusDrums> = [
    au.SquareSynth(),
    au.SquareSynth(-0.5),
    au.SquareSynth(),
    au.SquareSynth(0.5),
    au.DrumSynth(),
  ];

  function newPatterns() {
    seedRNG(state.seedCode);
    patterns = [
      choose([Generators.bass, Generators.bass2, Generators.emptyNote])(state),
      rnd() < 0.7 ? Generators.arp(state) : Generators.emptyNote(),
      rnd() < 0.7 ? Generators.melody1(state) : Generators.emptyNote(),
      choose([Generators.emptyNote, Generators.arp, Generators.melody1])(state),
      rnd() < 0.8 ? Generators.drum() : Generators.emptyDrum(),
    ];
  }

  // create initial patterns
  newPatterns();

  function frame(f: number) {
    const positionInPattern = f % PatternSize;
    if (f % 128 === 0 && f !== 0) {
      mutateState(state);
      newPatterns();
      clock.set(state.bpm, frame);
    }

    // Not a loop because these tuple parts have different types depending on melody vs drum
    synths[0].play(patterns[0][positionInPattern]);
    synths[1].play(patterns[1][positionInPattern]);
    synths[2].play(patterns[2][positionInPattern]);
    synths[3].play(patterns[3][positionInPattern]);
    synths[4].play(patterns[4][positionInPattern]);
  }

  clock.set(state.bpm, frame);
}

function stop(audioContext: AudioContext) {
  audioContext.close();
}

export { start, stop };
