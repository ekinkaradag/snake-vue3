<template>
  <div class="container">
    <div class="icon">
      <a href="https://github.com/ekinkaradag" target="_blank">
        <img
          class="icon"
          :src="getIconUrl('github-logo')"
          :alt="getIconAltText('github-logo')"
        />
      </a>
    </div>
    <div class="icon">
      <a href="https://linkedin.com/in/ekinkaradag" target="_blank">
        <img
          class="icon"
          :src="getIconUrl('linkedin-logo')"
          :alt="getIconAltText('linkedin-logo')"
        />
      </a>
    </div>
    <div class="icon">
      <a href="https://twitter.com/dev_ekinkaradag" target="_blank">
        <img
          class="icon"
          :src="getIconUrl('twitter-logo')"
          :alt="getIconAltText('twitter-logo')"
        />
      </a>
    </div>
    <div class="icon">
      <a href="https://instagram.com/dev_ekinkaradag" target="_blank">
        <img
          class="icon"
          :src="getIconUrl('instagram-logo')"
          :alt="getIconAltText('instagram-logo')"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getIconUrl(iconName) {
      return new URL(`../assets/${iconName}.svg`, import.meta.url);
    },
    getIconAltText(iconName) {
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
};
</script>

<style lang="postcss" scoped>
.container {
  display: inline-flex;
}

.icon {
  margin: 0 20px;
}
</style>
