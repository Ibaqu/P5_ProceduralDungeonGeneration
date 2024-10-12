let cols, rows;
let grid;
let cellSize = 10;
let MaxTunnels = 300;
let MaxLength = 8;
let lastDirections = [];

function setup() {
  createCanvas(800, 600);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  grid = createMap();
  drawMap();
}

function createMap() {
  let map = [];
  for (let i = 0; i < rows; i++) {
    map[i] = [];
    for (let j = 0; j < cols; j++) {
      map[i][j] = 1; // Set all cells to walls initially
    }
  }

  let x = floor(random(cols));
  let y = floor(random(rows));
  let direction = floor(random(4));

  for (let i = 0; i < MaxTunnels; i++) {
    for (let j = 0; j < MaxLength; j++) {
      if (x < 1 || x >= cols - 1 || y < 1 || y >= rows - 1) {
        break;
      }
      map[y][x] = 0; // Set the current cell to floor

      let nextDirection;
      do {
        nextDirection = floor(random(4)); // Choose a random direction
      } while (nextDirection === oppositeDirection(direction) || nextDirection === direction);

      lastDirections.push(nextDirection);

      switch (nextDirection) {
        case 0:
          x++;
          break;
        case 1:
          x--;
          break;
        case 2:
          y++;
          break;
        case 3:
          y--;
          break;
      }
    }

    x = constrain(x, 1, cols - 2);
    y = constrain(y, 1, rows - 2);
    direction = lastDirections[lastDirections.length - 1];
  }

  return map;
}

function drawMap() {
  background(255);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        fill(0);
      } else {
        fill(255);
      }
      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}

function oppositeDirection(dir) {
  switch (dir) {
    case 0:
      return 1;
    case 1:
      return 0;
    case 2:
      return 3;
    case 3:
      return 2;
  }
}
