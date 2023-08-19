<template>
  <div class="container">
    <div class="icon">
      <a href="https://github.com/ekinkaradag" target="_blank">
        <img
          class="icon"
          :src="GitHubLogo"
          :alt="getIconAltText('github-logo')"
        />
      </a>
    </div>
    <div class="icon">
      <a href="https://linkedin.com/in/ekinkaradag" target="_blank">
        <img
          class="icon"
          :src="LinkedInLogo"
          :alt="getIconAltText('linkedin-logo')"
        />
      </a>
    </div>
    <div class="icon">
      <a href="https://twitter.com/dev_ekinkaradag" target="_blank">
        <img
          class="icon"
          :src="TwitterLogo"
          :alt="getIconAltText('twitter-logo')"
        />
      </a>
    </div>
    <div class="icon">
      <a href="https://instagram.com/dev_ekinkaradag" target="_blank">
        <img
          class="icon"
          :src="InstagramLogo"
          :alt="getIconAltText('instagram-logo')"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import GitHubLogo from "@/assets/github-logo.svg";
import LinkedInLogo from "@/assets/linkedin-logo.svg";
import TwitterLogo from "@/assets/twitter-logo.svg";
import InstagramLogo from "@/assets/instagram-logo.svg";

export default {
  name: "SocialLinks",
  methods: {
    getIconAltText(iconName: string) {
      switch (iconName) {
        case "github-logo":
          return "GitHub icon";
        case "linkedin-logo":
          return "LinkedIn icon";
        case "twitter-logo":
          return "Twitter icon";
        case "instagram-logo":
          return "Instagram icon";
        default:
          return "Alt text is not defined";
      }
    },
  },
  setup() {
    return {
      GitHubLogo,
      LinkedInLogo,
      TwitterLogo,
      InstagramLogo,
    };
  },
};
</script>

<style lang="postcss" scoped>
.container {
  display: inline-flex;
}

.icon {
  margin: 0 5px;
}
</style>
