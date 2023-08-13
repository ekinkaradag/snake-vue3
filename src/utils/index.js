function isPosition(x, y, diffX, diffY) {
  return x === diffX && y === diffY;
}

function areSameCoordinates(coordinates_a, coordinates_b) {
  return isPosition(
    coordinates_a.x,
    coordinates_a.y,
    coordinates_b.x,
    coordinates_b.y
  );
}

function isSnake(snakeCoordinates, x, y) {
  if (!snakeCoordinates.length) {
    return 0;
  }

  return snakeCoordinates.filter((coord) => isPosition(coord.x, coord.y, x, y))
    .length;
}

function isSnack(x, y, snack) {
  return isPosition(x, y, snack.coordinate.x, snack.coordinate.y);
}

export { areSameCoordinates, isSnake, isSnack };
