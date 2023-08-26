<template>
  <div class="container">
    <p>slider: {{ value }}</p>
    <input
      v-model="value"
      type="range"
      class="slider"
      :min="min"
      :max="max"
      @input="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

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
    modelValue: {
      type: Number,
      required: false,
      default: 100,
    },
  },
  methods: {
    handleChange(e: Event) {
      this.$emit("valueChanged", (<HTMLInputElement>e.target).valueAsNumber);
    },
  },
  setup(props) {
    const value = ref<number>(props.modelValue);

    return {
      value,
    };
  },
});
</script>

<style scoped>
.container {
  width: 100px;
}

.slider {
  vertical-align: middle;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: gray;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #38fa89;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #38fa89;
  cursor: pointer;
}
</style>
