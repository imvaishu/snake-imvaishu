const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = "grid";

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => `${colId}_${rowId}`;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const displayResult = function(score) {
  const container = document.getElementsByClassName("result")[0];
  const resultMessage =
    '<div><h1 class="gameOver">Game Over</h1><nav class="score">Score: ' +
    score +
    '</nav><button onclick="window.location.reload();" class="button">Restart Game</button></div>';
  container.innerHTML = resultMessage;
};

const displayScore = function(score) {
  const totalScore = document.getElementById("score");
  totalScore.innerText = score;
};

const drawFood = function(foodStatus) {
  const [colId, rowId] = foodStatus.foodPosition;
  const cell = getCell(colId, rowId);
  cell.classList.add("food");
};

const eraseFood = function(foodStatus) {
  const [colId, rowId] = foodStatus.foodPosition;
  const cell = getCell(colId, rowId);
  cell.classList.remove("food");
};

const eraseSnake = function(snakeStatus) {
  let [colId, rowId] = snakeStatus.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snakeStatus.species);
};

const drawSnake = function(snakeStatus) {
  snakeStatus.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snakeStatus.species);
  });
};

const draw = function(game) {
  drawSnake(game.snakeStatus);
  drawSnake(game.ghostSnakeStatus);
  drawFood(game.foodStatus);
  displayScore(game.score);
};

const erase = function(game) {
  eraseSnake(game.snakeStatus);
  eraseSnake(game.ghostSnakeStatus);
  eraseFood(game.foodStatus);
};

const handleKeyPress = game => {
  game.turnSnakeLeft();
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const setup = function(game) {
  attachEventListeners(game);
  createGrids();
  draw(game);
  initialize(game);
};

const drawAndUpdate = function(game, ghostInterval, snakeInterval) {
  eraseFood(game.foodStatus);
  game.update();
  erase(game);
  if (game.isOver()) {
    displayResult(game.score);
    clearInterval(ghostInterval);
    clearInterval(snakeInterval);
    return;
  }
  draw(game);
};

const moveGhostSnake = function(game) {
  let number = Math.random() * 100;
  if (number > 50) {
    game.ghostSnake.turnLeft();
  }
};

const initialize = function(game) {
  const ghostInterval = setInterval(() => {
    moveGhostSnake(game);
  }, 500);

  const snakeInterval = setInterval(() => {
    drawAndUpdate(game, ghostInterval, snakeInterval);
  }, 100);
};

const snakeInit = function() {
  return new Snake(
    [
      [40, 25],
      [41, 25],
      [42, 25]
    ],
    new Direction(EAST),
    "snake"
  );
};

const ghostSnakeInit = function() {
  return new Snake(
    [
      [40, 30],
      [41, 30],
      [42, 30]
    ],
    new Direction(SOUTH),
    "ghost"
  );
};

const main = function() {
  const snake = snakeInit();
  const ghostSnake = ghostSnakeInit();
  const food = new Food([5, 5], "food");
  const game = new Game(snake, ghostSnake, food);
  setup(game);
};
