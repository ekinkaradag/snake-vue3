<template>
  <v-popup @closed="$emit('closed')">
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
      "https://api.github.com/repos/ekinkaradag/snake-vue3/contents/HOW_TO_PLAY.md";
    var myRequest = new Request(url, {
      headers: new Headers({ accept: "application/vnd.github.v3.raw" }),
    });
    const howToPlayMarkdownContent = ref<string>("Loading...");
    fetch(myRequest)
      .then((response: Response) => {
        if (response.ok) return response.text();
        throw new Error(
          "**There was error fetching the [`HOW_TO_PLAY.md`](https://api.github.com/repos/ekinkaradag/snake-vue3/contents/HOW_TO_PLAY.md) from [the GitHub Repo](https://github.com/ekinkaradag/snake-vue3). The server might not be reachable.**"
        );
      })
      .catch((error: Error) => {
        return error.message;
      })
      .then((text: string) => {
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
