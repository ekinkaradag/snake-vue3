<template>
  <div v-if="grid" class="game-grid">
    <v-grid-row :key="-1" :coordinate-y="-1" :is-floor-or-ceiling-wall="true" />
    <v-grid-row v-for="(row, key) in grid" :key="key" :coordinate-y="row" />
    <v-grid-row
      :key="grid.length"
      :coordinate-y="grid.length"
      :is-floor-or-ceiling-wall="true"
    />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useGameStore } from "@/store";
import VGridRow from "@/components/GridRow.vue";

export default {
  name: "Grid",

  components: {
    VGridRow,
  },

  setup() {
    const gameStore = useGameStore();
    const grid = computed(() => gameStore.grid);

    return {
      grid,
    };
  },
};
</script>
