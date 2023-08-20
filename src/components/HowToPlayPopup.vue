<template>
  <v-popup header="How to play" @close="$emit('closed')">
    <div class="description" />
  </v-popup>
</template>

<script lang="ts">
import VPopup from "@/components/Popup.vue";
export default {
  components: {
    VPopup,
  },
  setup() {
    return {
      //howToPlayHtml,
    };
  },
};
</script>
