import { createStore, createLogger } from "vuex";
import { areSameCoordinates } from "@/utils/index";

export const Directions = {
  UP: "UP",
  DOWN: "DOWN",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
};

export const GameRules = {
  WITH_BORDERS: "WITH_BORDERS",
  WITHOUT_BORDERS: "WITHOUT_BORDERS",
};

const store = createStore({
  state() {
    return {
      playground: {
        direction: "RIGHT",
        isGameOver: false,
      },
      grid: [],
      snake: {},
      snack: {},
      tickRate: 150,
      isPlaying: false,

      // non-game related
      packageVersion: APP_VERSION || "0",
    };
  },

  mutations: {
    SET_GRID(state, grid) {
      state.grid = grid;
    },
    SET_SNAKE(state, snake) {
      state.snake = snake;
    },
    SET_SNACK(state, snack) {
      state.snack = snack;
    },
    RESET_GAME(state) {
      state.grid = [];
      state.snack = {};
      state.snake = {};
      state.playground.isGameOver = false;
    },
    IS_PLAYING(state, val) {
      state.isPlaying = val;
    },
    SNAKE_CHANGE_DIRECTION(state, direction) {
      if (!areOppositeDirections(state.playground.direction, direction))
        state.playground.direction = direction;
    },
    SNAKE_MOVE(state, payload) {
      const isSnakeEating = payload.isSnakeEating;
      if (isSnakeEating) state.tickRate += 1;

      const snakeHead_new = payload.directionTicks[state.playground.direction](
        payload.snakeHead.x,
        payload.snakeHead.y
      );
      const snakeNeck = state.snake.coordinates[1];

      const snakeHead =
        !snakeNeck || !areSameCoordinates(snakeHead_new, snakeNeck)
          ? snakeHead_new
          : payload.snakeHead.x > snakeNeck.x
          ? payload.directionTicks[Directions.RIGHT](
              payload.snakeHead.x,
              payload.snakeHead.y
            )
          : payload.snakeHead.x < snakeNeck.x
          ? payload.directionTicks[Directions.LEFT](
              payload.snakeHead.x,
              payload.snakeHead.y
            )
          : payload.snakeHead.y > snakeNeck.y
          ? payload.directionTicks[Directions.DOWN](
              payload.snakeHead.x,
              payload.snakeHead.y
            )
          : payload.directionTicks[Directions.UP](
              payload.snakeHead.x,
              payload.snakeHead.y
            );

      const snakeTail = isSnakeEating
        ? state.snake.coordinates
        : payload.snakeTail;
      const snackCoordinate = isSnakeEating
        ? payload.snackRandomCoordinate
        : state.snack.coordinate;

      state.snake.coordinates = [snakeHead, ...snakeTail];
      state.snack.coordinate = snackCoordinate;
    },
    GAME_OVER(state) {
      state.playground.isGameOver = true;
    },
  },

  getters: {
    appVersion: (state) => {
      return state.packageVersion;
    },
  },

  plugins: [createLogger],
});

function areOppositeDirections(direction_a, direction_b) {
  return (
    (direction_a === Directions.UP && direction_b === Directions.DOWN) ||
    (direction_a === Directions.DOWN && direction_b === Directions.UP) ||
    (direction_a === Directions.LEFT && direction_b === Directions.RIGHT) ||
    (direction_a === Directions.RIGHT && direction_b === Directions.LEFT)
  );
}

export default store;
