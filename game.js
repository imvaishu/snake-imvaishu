class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }

  turnSnakeLeft() {
    return this.snake.turnLeft();
  }

  get snakeStatus() {
    return this.snake.status;
  }

  get ghostSnakeStatus() {
    return this.ghostSnake.status;
  }

  get foodStatus() {
    return {
      foodPosition: this.food.position.slice()
    }
  }

  update() {
    this.snake.move();
    this.ghostSnake.move();
  }
}