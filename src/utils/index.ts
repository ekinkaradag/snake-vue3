import { Direction } from "@/store/enums";
import { ICoordinate, ISnack } from "@/store/interfaces";

function isPosition(
  x: number,
  y: number,
  diffX: number,
  diffY: number
): boolean {
  return x === diffX && y === diffY;
}

function areSameCoordinates(
  coordinates_a: ICoordinate | undefined,
  coordinates_b: ICoordinate | undefined
): boolean {
  if (coordinates_a === undefined || coordinates_b === undefined) return false;
  return isPosition(
    coordinates_a.x,
    coordinates_a.y,
    coordinates_b.x,
    coordinates_b.y
  );
}

function isSnake(snakeCoordinates: ICoordinate[] | undefined, x: number | undefined, y: number | undefined): boolean {
  if (snakeCoordinates === undefined || x === undefined || y === undefined) return false;
  if (!snakeCoordinates.length) return false;

  return (
    snakeCoordinates.filter((coord) => isPosition(coord.x, coord.y, x, y))
      .length > 0
  );
}

function isSnack(x: number, y: number, snack: ISnack): boolean {
  return isPosition(x, y, snack.coordinate.x, snack.coordinate.y);
}

function areOppositeOrSameDirections(direction_a: Direction, direction_b: Direction): boolean {
  return (
    (direction_a === direction_b) ||
    (direction_a === Direction.UP && direction_b === Direction.DOWN) ||
    (direction_a === Direction.DOWN && direction_b === Direction.UP) ||
    (direction_a === Direction.LEFT && direction_b === Direction.RIGHT) ||
    (direction_a === Direction.RIGHT && direction_b === Direction.LEFT)
  );
}

export { areSameCoordinates, isSnake, isSnack, areOppositeOrSameDirections };
