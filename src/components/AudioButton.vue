<template>
  <p>Level: {{ volumeLevel }}</p>
  <VPopper arrow hover placement="right" :key="forceRerenderKey">
    <v-button
      class="audio-button"
      :icon-source="volumeIcon"
      icon-alt-text="Volume adjustment"
      @clicked="onVolumeChangedViaButton"
    />
    <template #content>
      <v-slider
        :model-value="volumeLevel"
        @value-changed="onVolumeChangedViaSlider"
      />
    </template>
  </VPopper>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import VPopper from "vue3-popper";
import VolumeMutedIcon from "@/assets/volume-xmark-solid.svg";
import VolumeLowIcon from "@/assets/volume-low-solid.svg";
import VolumeHighIcon from "@/assets/volume-high-solid.svg";
import VButton from "@/components/Button.vue";
import VSlider from "@/components/Slider.vue";

export default defineComponent({
  components: {
    VPopper,
    VButton,
    VSlider,
  },
  setup() {
    const forceRerenderKey = ref<number>(0);
    const tempVolumeLevel = ref<number | undefined>();
    const volumeLevel = ref<number>(100);
    const volumeIcon = computed(() =>
      volumeLevel.value > 50
        ? VolumeHighIcon
        : volumeLevel.value > 0
        ? VolumeLowIcon
        : VolumeMutedIcon
    );

    function rerenderButtonAndSlider() {
      forceRerenderKey.value = forceRerenderKey.value === 0 ? 1 : 0;
    }

    function onVolumeChangedViaSlider(e: number) {
      if (tempVolumeLevel.value) tempVolumeLevel.value = undefined;

      volumeLevel.value = e;
    }

    function onVolumeChangedViaButton() {
      if (!tempVolumeLevel.value) {
        tempVolumeLevel.value = volumeLevel.value;
        volumeLevel.value = 0;

        rerenderButtonAndSlider();
      } else {
        volumeLevel.value = tempVolumeLevel.value;
        tempVolumeLevel.value = undefined;

        rerenderButtonAndSlider();
      }
    }

    return {
      forceRerenderKey,
      volumeLevel,
      volumeIcon,
      onVolumeChangedViaSlider,
      onVolumeChangedViaButton,
    };
  },
});
</script>
<style scoped>
.container {
  position: relative;
}
</style>
