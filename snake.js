class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get status() {
    return {
      location: this.positions.slice(),
      direction: this.direction,
      species: this.type,
      previousTail: this.previousTail
    }
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  hasEaten(food) {
    const [colId, rowId] = food.position;
    const [headX, headY] = this.positions[this.positions.length - 1];
    return headX === colId && headY === rowId;
  }

  increaseSnake() {
    this.positions.unshift(this.previousTail);
  }
}

