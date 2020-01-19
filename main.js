const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => `${colId}_${rowId}`;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function (grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function () {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const drawFood = function (food) {
  const [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add('food')
}

const eraseTail = function (snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function (snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const draw = function (game) {
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
  drawFood(game.food);
}

const handleKeyPress = game => {
  game.turnSnakeLeft();
};

const moveAndDrawSnake = function (snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const snakeInit = function () {
  return new Snake(
    [
      [40, 25],
      [41, 25],
      [42, 25]
    ],
    new Direction(EAST),
    'snake'
  );
}

const ghostSnakeInit = function () {
  return new Snake(
    [
      [40, 30],
      [41, 30],
      [42, 30]
    ],
    new Direction(SOUTH),
    'ghost'
  );
}


const setup = function (game) {
  attachEventListeners(game);
  createGrids();
  draw(game);
}

const main = function () {
  const snake = snakeInit();
  const ghostSnake = ghostSnakeInit();
  const food = new Food(5, 5);
  const game = new Game(snake, ghostSnake, food);

  setInterval(() => {
    moveAndDrawSnake(game.snake);
    moveAndDrawSnake(game.ghostSnake);
  }, 200);

  setInterval(() => {
    let x = Math.random() * 100;
    if (x > 50) {
      game.ghostSnake.turnLeft();
    }
  }, 500);
  setup(game)
};