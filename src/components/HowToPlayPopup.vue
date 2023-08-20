<template>
  <v-popup header="How to play" @close="$emit('closed')">
    <template #description>
      <div v-html="howToPlayMarkdownHTML"></div>
    </template>
  </v-popup>
</template>

<script lang="ts">
import VPopup from "@/components/Popup.vue";
import { marked } from "marked";
import { computed } from "vue";
export default {
  components: {
    VPopup,
  },
  setup() {
    const howToPlayMarkdown = "**test**";
    const howToPlayMarkdownHTML = computed(() => marked(howToPlayMarkdown));
    return {
      howToPlayMarkdownHTML,
    };
  },
};
</script>
