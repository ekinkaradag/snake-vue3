<template>
  <div class="grid-row">
    <v-grid-cell
      v-for="(cell, key) in grid"
      :key="key"
      :coordinate-y="coordinateY"
      :coordinate-x="cell"
      :grid-size="grid.length"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import VGridCell from "@/components/Cell.vue";

export default {
  props: {
    coordinateY: {
      type: Number,
      required: true,
    },
  },

  components: {
    VGridCell,
  },

  setup() {
    const store = useStore();
    const grid = computed(() => store.state.grid);

    return {
      grid,
    };
  },
};
</script>

<style>
.grid-row {
  display: flex;
  border-left: 1px solid #363636;
  border-right: 1px solid #363636;
}

.grid-row:last-child {
  border-bottom: 1px solid #363636;
}
</style>
