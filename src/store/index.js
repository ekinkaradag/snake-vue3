import { createStore, createLogger } from "vuex";
import { areSameCoordinates } from "@/utils/index";

export const directions = {
  UP: "UP",
  DOWN: "DOWN",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
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
          ? payload.directionTicks[directions.RIGHT](
              payload.snakeHead.x,
              payload.snakeHead.y
            )
          : payload.snakeHead.x < snakeNeck.x
          ? payload.directionTicks[directions.LEFT](
              payload.snakeHead.x,
              payload.snakeHead.y
            )
          : payload.snakeHead.y > snakeNeck.y
          ? payload.directionTicks[directions.DOWN](
              payload.snakeHead.x,
              payload.snakeHead.y
            )
          : payload.directionTicks[directions.UP](
              payload.snakeHead.x,
              payload.snakeHead.y
            );

      const snakeTail = isSnakeEating
        ? state.snake.coordinates
        : payload.snakeWithoutStub;
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
    (direction_a === directions.UP && direction_b === directions.DOWN) ||
    (direction_a === directions.DOWN && direction_b === directions.UP) ||
    (direction_a === directions.LEFT && direction_b === directions.RIGHT) ||
    (direction_a === directions.RIGHT && direction_b === directions.LEFT)
  );
}

export default store;
