import { createStore } from "vuex";
import { Direction } from "@/store/enums";
import { areOppositeDirections, areSameCoordinates } from "@/utils/index";
import { IStore } from "./interfaces";

const store = createStore({
  state() {
    return {
      playground: {
        direction: Direction.RIGHT,
        isGameOver: false,
      },
      grid: [],
      snake: undefined,
      snack: undefined,
      tickRate: 150,
      isPlaying: false,

      packageVersion: __APP_VERSION__ || "0",
    } as IStore;
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
      state.snack = undefined;
      state.snake = undefined;
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
      if (!state.snake) return;
      if (!state.snack) return;
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
          ? payload.directionTicks[Direction.RIGHT](
              payload.snakeHead.x,
              payload.snakeHead.y
            )
          : payload.snakeHead.x < snakeNeck.x
          ? payload.directionTicks[Direction.LEFT](
              payload.snakeHead.x,
              payload.snakeHead.y
            )
          : payload.snakeHead.y > snakeNeck.y
          ? payload.directionTicks[Direction.DOWN](
              payload.snakeHead.x,
              payload.snakeHead.y
            )
          : payload.directionTicks[Direction.UP](
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
});

export default store;
