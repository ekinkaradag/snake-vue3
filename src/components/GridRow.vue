<template>
  <div v-if="grid.length > 0" class="grid-row">
    <v-grid-cell
      :key="-1"
      :coordinate-x="-1"
      :coordinate-y="coordinateY"
      :grid-size="grid.length"
      :is-wall-cell="true"
    />
    <v-grid-cell
      v-for="(cell, key) in grid"
      :key="key"
      :coordinate-x="cell"
      :coordinate-y="coordinateY"
      :grid-size="grid.length"
      :is-wall-cell="isFloorOrCeilingWall"
    />
    <v-grid-cell
      :key="grid.length"
      :coordinate-x="grid.length"
      :coordinate-y="coordinateY"
      :grid-size="grid.length"
      :is-wall-cell="true"
    />
  </div>
</template>

<script langt="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import VGridCell from "@/components/Cell.vue";

export default {
  props: {
    coordinateY: {
      type: Number,
      required: true,
    },
    isFloorOrCeilingWall: {
      type: Boolean,
      required: false,
      default: false,
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
