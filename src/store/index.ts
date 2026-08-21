import { defineStore } from 'pinia';
import { areOppositeOrSameDirections, areSameCoordinates } from "@/utils/index";
import { Direction } from "@/store/enums";
import { IStore, ISnake, ISnack, IMovePayload } from "@/store/interfaces";

export const useGameStore = defineStore('snake', {
  state: () => ({
    playground: {
      direction: Direction.RIGHT,
      isGameOver: false,
    },
    grid: [] as number[],
    snake: undefined as ISnake | undefined,
    snack: undefined as ISnack | undefined,
    tickRate: 150,
    isPlaying: false,

    packageVersion: __APP_VERSION__ || "0",
  } as IStore),

  getters: {
    appVersion: (state) => {
      return state.packageVersion;
    },
  },

  actions: {
    // State setters are now direct actions
    setGrid(grid: number[]) {
      this.grid = grid;
    },
    setSnake(snake: ISnake) {
      this.snake = snake;
    },
    setSnack(snack: ISnack) {
      this.snack = snack;
    },

    // Game state actions
    resetGame() {
      this.grid = [];
      this.snack = undefined;
      this.snake = undefined;
      this.playground.isGameOver = false;
    },
    setIsPlaying(val: boolean) {
      this.isPlaying = val;
    },

    // Direction change logic (was SNAKE_CHANGE_DIRECTION mutation)
    changeDirection(direction: Direction) {
      if (!areOppositeOrSameDirections(this.playground.direction, direction)) {
        this.playground.direction = direction;
      }
    },

    // Movement logic (was SNAKE_MOVE mutation)
    moveSnake(payload: IMovePayload) {
      if (!this.snake || !this.snack) return;
      const isSnakeEating = payload.isSnakeEating;
      if (isSnakeEating) this.tickRate += 1;

      // Calculate new head position
      let snakeHead_new: { x: number, y: number };
      const snakeNeck = this.snake.coordinates[1];

      if (!snakeNeck || !areSameCoordinates(payload.snakeHeadCoordinate, snakeNeck)) {
        snakeHead_new = payload.directionTicks[this.playground.direction](
          payload.snakeHeadCoordinate.x,
          payload.snakeHeadCoordinate.y
        );
      } else if (payload.snakeHeadCoordinate.x > snakeNeck.x) {
        snakeHead_new = payload.directionTicks[Direction.RIGHT](
          payload.snakeHeadCoordinate.x,
          payload.snakeHeadCoordinate.y
        );
      } else if (payload.snakeHeadCoordinate.x < snakeNeck.x) {
        snakeHead_new = payload.directionTicks[Direction.LEFT](
          payload.snakeHeadCoordinate.x,
          payload.snakeHeadCoordinate.y
        );
      } else if (payload.snakeHeadCoordinate.y > snakeNeck.y) {
        snakeHead_new = payload.directionTicks[Direction.DOWN](
          payload.snakeHeadCoordinate.x,
          payload.snakeHeadCoordinate.y
        );
      } else { // Up
        snakeHead_new = payload.directionTicks[Direction.UP](
          payload.snakeHeadCoordinate.x,
          payload.snakeHeadCoordinate.y
        );
      }

      // Determine tail and snack coordinates
      const snakeTail = isSnakeEating ? this.snake.coordinates : payload.snakeTailCoordinates;
      const snackCoordinate = isSnakeEating ? payload.snackRandomCoordinate : this.snack.coordinate;

      // Update state
      this.snake.coordinates = [snakeHead_new, ...snakeTail];
      this.snack.coordinate = snackCoordinate;
    },

    gameOver() {
      this.playground.isGameOver = true;
    }
  },
});
