<template>
  <v-popup @close="$emit('closed')">
    <template #description>
      <div v-html="howToPlayMarkdownHTML"></div>
    </template>
  </v-popup>
</template>

<script lang="ts">
import VPopup from "@/components/Popup.vue";
import { marked } from "marked";
import { computed, ref } from "vue";
export default {
  components: {
    VPopup,
  },
  setup() {
    const howToPlayMarkdownContent = ref<string>("");
    fetch(
      "https://raw.githubusercontent.com/ekinkaradag/snake-vue3/14-how-to-play-popup/HOW_TO_PLAY.md"
    )
      .then((response) => response.text())
      .then((text) => (howToPlayMarkdownContent.value = text));

    const howToPlayMarkdownHTML = computed(() =>
      marked(howToPlayMarkdownContent.value)
    );
    return {
      howToPlayMarkdownHTML,
    };
  },
};
</script>
