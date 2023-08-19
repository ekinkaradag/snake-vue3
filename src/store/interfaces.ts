export interface Coordinate {
  x: number;
  y: number;
}

export interface Snake {
  coordinates: Coordinate[];
}

export interface Snack {
  coordinate: Coordinate;
}

export interface Playground {
  direction: "UP" | "DOWN" | "RIGHT" | "LEFT";
  isGameOver: boolean;
}

export interface Store {
  playground: Playground;
  grid?: number[];
  snake?: Snake;
  snack?: Snack;
  tickRate: number;
  isPlaying: boolean;
  packageVersion: string;
}
