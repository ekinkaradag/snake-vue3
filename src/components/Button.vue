<template>
  <button @click="handleClick">
    {{ title }}
  </button>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick(e: any) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="postcss" scoped>
button {
  appearance: none;
  backface-visibility: hidden;
  background-color: #27ae60;
  border-radius: 8px;
  border-style: none;
  box-shadow: #27ae6026 0 4px 9px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family:
    Inter,
    -apple-system,
    system-ui,
    "Segoe UI",
    Helvetica,
    Arial,
    sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: normal;
  line-height: 1.5;
  outline: none;
  overflow: hidden;
  padding: 13px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transform: translate3d(0, 0, 0);
  transition: all 0.3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  text-shadow:
    -1px -1px 0 #032b13,
    1px -1px 0 #032b13,
    -1px 1px 0 #032b13,
    1px 1px 0 #032b13;
}

button:hover {
  background-color: #1e8449;
  opacity: 1;
  transform: translateY(0);
  transition-duration: 0.35s;
}

button:active {
  transform: translateY(2px);
  transition-duration: 0.35s;
}

button:hover {
  box-shadow: #38fa8933 0 6px 12px;
}
</style>
