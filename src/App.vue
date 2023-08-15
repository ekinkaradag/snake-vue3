<template>
  <div class="page">
    <div class="header">
      <div class="version">Version {{ $store.getters.appVersion }}</div>
      <div class="disclaimer">© Copyright 2023 Ekin Karadag</div>
    </div>
    <h1 class="title">SNAKE</h1>
    <v-button
      v-if="!isPlaying"
      @click="onStartGame(gameRules.WITHOUT_BORDERS)"
      title="Play without borders"
      class="button-play"
    />
    <v-button
      v-if="!isPlaying"
      @click="onStartGame(gameRules.WITH_BORDERS)"
      title="Play with borders"
      class="button-play"
    />
    <v-button
      v-else
      @click="onStopGame"
      :style="{
        marginBottom: '20px',
      }"
      title="Stop"
    />
    <v-playground :score="score" />
    <v-social-links class="footer" />
  </div>
</template>

<script>
import { computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { areSameCoordinates, isSnake } from "@/utils/index";
import { Directions, GameRules } from "@/store/index";

// Components
import VButton from "@/components/Button.vue";
import VGrid from "@/components/Grid.vue";
import VPlayground from "@/components/Playground.vue";
import VSocialLinks from "@/components/SocialLinks.vue";

const GRID_SIZE = 35;
const DIRECTION_TICKS_WITHOUT_BORDERS = {
  UP: (x, y) => ({ x, y: y <= 0 ? GRID_SIZE - 1 : y - 1 }),
  DOWN: (x, y) => ({ x, y: y >= GRID_SIZE - 1 ? 0 : y + 1 }),
  RIGHT: (x, y) => ({ x: x >= GRID_SIZE - 1 ? 0 : x + 1, y }),
  LEFT: (x, y) => ({ x: x <= 0 ? GRID_SIZE - 1 : x - 1, y }),
};
const DIRECTION_TICKS_WITH_BORDERS = {
  UP: (x, y) => ({ x, y: y - 1 }),
  DOWN: (x, y) => ({ x, y: y + 1 }),
  RIGHT: (x, y) => ({ x: x + 1, y }),
  LEFT: (x, y) => ({ x: x - 1, y }),
};
const KEY_CODES_MAPPER = {
  38: Directions.UP, // ARROW_UP Key
  87: Directions.UP, // W Key

  39: Directions.RIGHT, // ARROW_RIGHT Key
  68: Directions.RIGHT, // D Key

  37: Directions.LEFT, // ARROW_LEFT Key
  65: Directions.LEFT, // A Key

  40: Directions.DOWN, // ARROW_DOWN Key
  83: Directions.DOWN, // S Key
};

export default {
  name: "App",

  components: {
    VGrid,
    VButton,
    VPlayground,
    VSocialLinks,
  },

  setup() {
    const store = useStore();
    const gameRules = computed(() => GameRules);
    const isPlaying = computed(() => store.state.isPlaying);
    const currentDirection = computed(() => store.state.playground.direction);
    const snack = computed(() => store.state.snack);
    const snake = computed(() => store.state.snake);
    const snakeHead = computed(() => store.state.snake.coordinates[0]);
    const snakeTail = computed(() => store.state.snake.coordinates.slice(1));
    const score = computed(() => store.state.snake?.coordinates?.length - 1);
    const tickRate = computed(() => store.state.tickRate);

    // Interval variable
    let interval = null;

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getRandomCoordinate() {
      return {
        y: getRandomNumber(1, GRID_SIZE - 1),
        x: getRandomNumber(1, GRID_SIZE - 1),
      };
    }

    function getRandomSnackCoordinate() {
      let newCoordinate = getRandomCoordinate();

      if (
        snake.value.coordinates.find((snakeCellCoordinate) =>
          areSameCoordinates(snakeCellCoordinate, newCoordinate)
        )
      )
        newCoordinate = getRandomSnackCoordinate();

      return newCoordinate;
    }

    function getSnakeTail() {
      return snake.value.coordinates.slice(
        0,
        snake.value.coordinates.length - 1
      );
    }

    function generateGrid() {
      const grid = [];

      for (let i = 0; i < GRID_SIZE; i++) {
        grid.push(i);
      }

      store.commit("SET_GRID", grid);
    }

    function generateSnake() {
      const snake = {
        coordinates: [
          { x: Math.ceil(GRID_SIZE / 2), y: Math.ceil(GRID_SIZE / 2) },
        ],
      };

      store.commit("SET_SNAKE", snake);
    }

    function generateSnack() {
      const snack = {
        coordinate: getRandomSnackCoordinate(),
      };

      store.commit("SET_SNACK", snack);
    }

    function generateInitials() {
      resetGame();
      generateGrid();
      generateSnake();
      generateSnack();
    }

    function resetGame() {
      store.commit("RESET_GAME");
    }

    function snakeHeadTouchesTail() {
      return isSnake(snakeTail.value, snakeHead.value.x, snakeHead.value.y);
    }

    function isSnakeEating() {
      return areSameCoordinates(snakeHead.value, snack.value.coordinate);
    }

    function isSnakeOutside() {
      return (
        snakeHead.value.x >= GRID_SIZE ||
        snakeHead.value.y >= GRID_SIZE ||
        snakeHead.value.x < 0 ||
        snakeHead.value.y < 0
      );
    }

    function onChangeDirection(e) {
      const newDirection = KEY_CODES_MAPPER[e.keyCode];
      if (!newDirection || newDirection === currentDirection.value) {
        return;
      }

      store.commit("SNAKE_CHANGE_DIRECTION", newDirection);
    }

    function onTick(gameRule) {
      if (
        snakeHeadTouchesTail() ||
        (gameRule === gameRules.value.WITH_BORDERS && isSnakeOutside())
      ) {
        store.commit("GAME_OVER");
        onStopGame();
      } else {
        store.commit("SNAKE_MOVE", {
          isSnakeEating: isSnakeEating(),
          directionTicks:
            gameRule === gameRules.value.WITHOUT_BORDERS
              ? DIRECTION_TICKS_WITHOUT_BORDERS
              : DIRECTION_TICKS_WITH_BORDERS,
          snakeHead: snakeHead.value,
          snakeTail: getSnakeTail(),
          snackRandomCoordinate: getRandomSnackCoordinate(),
        });
      }
    }

    function onStartGame(gameRule) {
      onStopGame();
      generateInitials();
      store.commit("IS_PLAYING", true);

      interval = setInterval(() => {
        onTick(gameRule);
      }, tickRate.value);
    }

    function onStopGame() {
      clearInterval(interval);
      store.commit("IS_PLAYING", false);
    }

    onMounted(() => {
      window.addEventListener("keydown", onChangeDirection);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", onChangeDirection);
      clearInterval(interval);
    });

    return {
      gameRules,
      isPlaying,
      score,
      onStartGame,
      onStopGame,
    };
  },
};
</script>
<style>
body {
  background-color: black;
}

.page {
  width: 100%;
  text-align: center;
}

.button-play {
  margin: 0 10px;
  margin-bottom: 20px;
  width: 190px;
}

.title {
  color: rgb(0, 199, 0);
  margin-left: 30px;
  letter-spacing: 30px;
  text-shadow: 1px 1px 1px darkgreen, -1px 1px 1px darkgreen,
    1px -1px 1px darkgreen, -1px -1px 1px darkgreen, 0 0 64px lightgreen,
    0 0 64px lightgreen;
  font-size: 64px;
  font-family: "Courier", monospace;
  font-weight: bold;
}

.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  color: gray;
}

.disclaimer {
  flex: 1;
  text-align: end;
}

.footer {
  margin-top: 20px;
}
</style>
