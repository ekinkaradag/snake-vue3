<template>
  <div class="game-grid">
    <v-grid-row v-for="(row, key) in grid" :key="key" :coordinate-y="row" />
  </div>
</template>

<script>
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
