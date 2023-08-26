<template>
  <div class="container">
    <input
      type="range"
      class="slider"
      :min="min"
      :max="max"
      v-model="modelValue"
      @input="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: false,
      default: 100,
    },
  },
  data() {
    return {
      modelValue: 100,
    };
  },
  methods: {
    handleChange(e: Event) {
      this.$emit("valueChanged", (<HTMLInputElement>e.target).valueAsNumber);
    },
  },
  setup() {},
});
</script>

<style scoped>
.container {
  width: 100px;
}

.slider {
  vertical-align: middle;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #04aa6d;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #04aa6d;
  cursor: pointer;
}
</style>
