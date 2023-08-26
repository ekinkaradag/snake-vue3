<template>
  <VPopper arrow hover placement="right">
    <v-button
      class="audio-button"
      title="Audio"
      @clicked="console.log('clicked')"
    />
    <template #content>
      <v-slider @value-changed="valueChanged" />
    </template>
  </VPopper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VPopper from "vue3-popper";
import VButton from "@/components/Button.vue";
import VSlider from "@/components/Slider.vue";

export default defineComponent({
  components: {
    VPopper,
    VButton,
    VSlider,
  },
  setup() {
    function valueChanged(e: number) {
      console.log(e);
    }

    return {
      valueChanged,
    };
  },
});
</script>
<style scoped>
.container {
  position: relative;
}
</style>
