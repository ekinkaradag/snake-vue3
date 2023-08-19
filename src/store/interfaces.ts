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

export interface IStore {
  playground: IPlayground;
  grid?: number[];
  snake?: ISnake;
  snack?: ISnack;
  tickRate: number;
  isPlaying: boolean;
  readonly packageVersion: string;
}
