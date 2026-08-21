import { Direction } from "@/store/enums";

export interface ICoordinate {
  x: number;
  y: number;
}

export interface ISnake {
  coordinates: ICoordinate[];
}

export interface ISnack {
  coordinate: ICoordinate;
}

export interface IPlayground {
  direction: Direction;
  isGameOver: boolean;
}

export interface IMovePayload {
  isSnakeEating: boolean,
  directionTicks: {
    UP: (x: number, y: number) => { x: number, y: number },
    DOWN: (x: number, y: number) => { x: number, y: number },
    RIGHT: (x: number, y: number) => {x: number, y: number },
    LEFT: (x: number, y: number) => { x: number, y: number },
  }
  snakeHeadCoordinate: ICoordinate,
  snakeTailCoordinates: ICoordinate[],
  snackRandomCoordinate: ICoordinate,
}

export interface IStore {
  playground: IPlayground;
  grid?: number[];
  snake?: ISnake;
  snack?: ISnack;
  tickRate: number;
  isPlaying: boolean;
  readonly packageVersion: string;
}
