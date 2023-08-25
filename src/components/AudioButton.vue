<template>
  <VPopper arrow hover placement="right">
    <v-button
      class="audio-button"
      title="Audio"
      @clicked="console.log('clicked')"
      @mouseenter="console.log('mouseenter')"
    />
    <template #content>
      <div class="container">
        <v-button
          class="audio-button"
          title="popup Audio"
          @clicked="console.log('popup clicked')"
          @mouseenter="console.log('popup mouseenter')"
        />
      </div>
    </template>
  </VPopper>
  <!--
  <div class="container">
    <v-button
      class="audio-button"
      title="Audio"
      @clicked="console.log('clicked')"
      @mouseenter="console.log('mouseenter')"
    />
    <div class="volume-popup">
      <p>AUDIO SLIDER HERE</p>
    </div>
  </div>-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VPopper from "vue3-popper";
import VButton from "@/components/Button.vue";

export default defineComponent({
  components: {
    VButton,
    VPopper,
  },
  setup() {},
});
</script>
<style lang="postcss" scoped>
.container {
  position: relative;
  padding: 5px;
  background-color: aqua;
}
</style>
