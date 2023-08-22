<template>
  <div class="game-grid">
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
import { useStore } from "vuex";
import VGridRow from "@/components/GridRow.vue";

export default {
  name: "Grid",

  components: {
    VGridRow,
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
