import { createStore } from "vuex";
import { areOppositeOrSameDirections, areSameCoordinates } from "@/utils/index";
import { Direction } from "@/store/enums";
import { IStore, ISnake, ISnack, IMovePayload } from "@/store/interfaces";

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
    SET_GRID(state: IStore, grid: number[]) {
      state.grid = grid;
    },
    SET_SNAKE(state: IStore, snake: ISnake) {
      state.snake = snake;
    },
    SET_SNACK(state: IStore, snack: ISnack) {
      state.snack = snack;
    },
    RESET_GAME(state: IStore) {
      state.grid = [];
      state.snack = undefined;
      state.snake = undefined;
      state.playground.isGameOver = false;
    },
    IS_PLAYING(state: IStore, val: boolean) {
      state.isPlaying = val;
    },
    SNAKE_CHANGE_DIRECTION(state: IStore, direction: Direction) {
      if (!areOppositeOrSameDirections(state.playground.direction, direction))
        state.playground.direction = direction;
    },
    SNAKE_MOVE(state: IStore, payload: IMovePayload) {
      if (!state.snake) return;
      if (!state.snack) return;
      const isSnakeEating = payload.isSnakeEating;
      if (isSnakeEating) state.tickRate += 1;

      const snakeHead_new = payload.directionTicks[state.playground.direction](
        payload.snakeHeadCoordinate.x,
        payload.snakeHeadCoordinate.y
      );
      const snakeNeck = state.snake.coordinates[1];

      const snakeHead =
        !snakeNeck || !areSameCoordinates(snakeHead_new, snakeNeck)
          ? snakeHead_new
          : payload.snakeHeadCoordinate.x > snakeNeck.x
          ? payload.directionTicks[Direction.RIGHT](
              payload.snakeHeadCoordinate.x,
              payload.snakeHeadCoordinate.y
            )
          : payload.snakeHeadCoordinate.x < snakeNeck.x
          ? payload.directionTicks[Direction.LEFT](
              payload.snakeHeadCoordinate.x,
              payload.snakeHeadCoordinate.y
            )
          : payload.snakeHeadCoordinate.y > snakeNeck.y
          ? payload.directionTicks[Direction.DOWN](
              payload.snakeHeadCoordinate.x,
              payload.snakeHeadCoordinate.y
            )
          : payload.directionTicks[Direction.UP](
              payload.snakeHeadCoordinate.x,
              payload.snakeHeadCoordinate.y
            );

      const snakeTail = isSnakeEating
        ? state.snake.coordinates
        : payload.snakeTailCoordinates;
      const snackCoordinate = isSnakeEating
        ? payload.snackRandomCoordinate
        : state.snack.coordinate;

      state.snake.coordinates = [snakeHead, ...snakeTail];
      state.snack.coordinate = snackCoordinate;
    },
    GAME_OVER(state: IStore) {
      state.playground.isGameOver = true;
    },
  },

  getters: {
    appVersion: (state: IStore) => {
      return state.packageVersion;
    },
  },
});

export default store;
