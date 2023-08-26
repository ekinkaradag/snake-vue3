<template>
  <VPopper arrow hover placement="right">
    <v-button
      class="audio-button"
      :icon-source="volumeIcon"
      icon-alt-text="Volume adjustment"
      @clicked="console.log('clicked')"
    />
    <template #content>
      <v-slider :model-value="volumeValue" @value-changed="volumeChanged" />
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
    const volumeValue = ref<number>(100);
    const volumeIcon = computed(() =>
      volumeValue.value > 50
        ? VolumeHighIcon
        : volumeValue.value > 0
        ? VolumeLowIcon
        : VolumeMutedIcon
    );

    function volumeChanged(e: number) {
      volumeValue.value = e;
      console.log(volumeValue.value);
    }

    return {
      volumeValue,
      volumeIcon,
      volumeChanged,
    };
  },
});
</script>
<style scoped>
.container {
  position: relative;
}
</style>
