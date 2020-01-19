class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }

  turnSnakeLeft() {
    return this.snake.turnLeft();
  }

  update() {
    this.snake.move();
    this.ghostSnake.move();
  }
}