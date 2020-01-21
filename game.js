class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scoreCard = new ScoreCard();
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
      foodPosition: this.food.position.location.slice()
    }
  }

  get score() {
    return this.scoreCard.score;
  }

  update() {
    this.snake.move();
    this.ghostSnake.move();
    if (this.snake.hasEaten(this.food)) {
      if (this.food.position.type === 'food') {
        this.snake.increaseSnake();
      }
      this.scoreCard.currentScore(this.food.position.point);
      this.generateFood();
    }
  }

  generateFood() {
    const colId = Math.floor(Math.random() * 100);
    const rowId = Math.floor(Math.random() * 60);

    this.food = new Food([colId, rowId], 'food');
  }
}