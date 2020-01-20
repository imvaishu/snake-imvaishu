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
    if (this.snake.hasEaten(this.food)) {
      this.generateFood();
      this.snake.increaseSnake();
    }
  }

  generateFood() {
    const colId = Math.floor(Math.random() * 100);
    const rowId = Math.floor(Math.random() * 60);

    this.food = new Food(colId, rowId);
  }
}