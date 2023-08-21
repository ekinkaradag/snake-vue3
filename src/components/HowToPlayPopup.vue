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
    const url =
      "https://api.github.com/repos/ekinkaradag/snake-vue3/contents/HOW_TO_PLAY.md?ref=14-how-to-play-popup";
    var myRequest = new Request(url, {
      headers: new Headers({ accept: "application/vnd.github.v3.raw" }),
    });
    const howToPlayMarkdownContent = ref<string>("Loading...");
    fetch(myRequest)
      .then((response) => response.text())
      .catch(
        () =>
          "**There was error fetching the data from [the GitHub Repo](https://api.github.com/repos/ekinkaradag/snake-vue3/contents/HOW_TO_PLAY.md). The server might not be reachable.**"
      )
      .then((text) => {
        howToPlayMarkdownContent.value = text;
      });

    const howToPlayMarkdownHTML = computed(() =>
      marked(howToPlayMarkdownContent.value)
    );
    return {
      howToPlayMarkdownHTML,
    };
  },
};
</script>
