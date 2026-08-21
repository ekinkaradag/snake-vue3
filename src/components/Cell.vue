<template>
  <div class="grid-cell" :class="classNames" />
</template>

<script lang="ts">
import { computed } from "vue";
import { useGameStore } from "@/store";
import { isSnake, isSnack } from "@/utils/index";

export default {
  props: {
    coordinateY: {
      type: Number,
      required: true,
    },
    coordinateX: {
      type: Number,
      required: true,
    },
    gridSize: {
      type: Number,
      required: true,
    },
    isWallCell: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props) {
    const gameStore = useGameStore();
    const snake = computed(() => gameStore.snake);
    const snack = computed(() => gameStore.snack);
    const isGameOver = computed(() => gameStore.playground.isGameOver);

    const classNames = computed(() => ({
      "grid-cell-snake-head": snake.value?.coordinates
        ? isSnake(
            [snake.value.coordinates[0]],
            props.coordinateX,
            props.coordinateY
          )
        : false,
      "grid-cell-snake": snake.value?.coordinates
        ? isSnake(snake.value.coordinates, props.coordinateX, props.coordinateY)
        : false,
      "grid-cell-snack": snack.value?.coordinate
        ? isSnack(props.coordinateX, props.coordinateY, snack.value)
        : false,
      "grid-cell-game-over": isGameOver.value,
      "grid-cell-wall": props.isWallCell,
    }));

    return {
      classNames,
    };
  },
};
</script>

<style>
.grid-cell {
  border-top: 1px solid #363636;
  width: 15px;
  height: 15px;
  position: relative;
  aspect-ratio: 1 / 1;
}

.grid-cell:not(:first-child) {
  border-left: 1px solid #363636;
}

.grid-cell-wall:not(.grid-cell-snake.grid-cell-game-over.grid-cell-snake-head) {
  background-color: #00d9ff;
}

.grid-cell-snake-head:not(.grid-cell-game-over) {
  background-color: #15ff00 !important;
}

.grid-cell-snake:not(.grid-cell-game-over) {
  background-color: #086600;
}

.grid-cell-snake.grid-cell-game-over.grid-cell-snake-head {
  background-color: #e72e2e !important;
}

.grid-cell-snake.grid-cell-game-over {
  background-color: #ff7171;
}

.grid-cell-snack {
  background-color: #d87bf0;
}
</style>
