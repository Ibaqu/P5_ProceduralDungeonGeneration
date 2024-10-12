let cols, rows;
let grid;
let cellSize = 10; // Size of a single tunnel cell
let MaxTunnels = 300; // Maximum number of tunnels allowed on a map
let MaxTunnelLength = 8; // Maximum tunnel length

function setup() {
  createCanvas(800, 600);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  grid = createMap();
  drawMap();
}

function createMap() {
  // Initialize 2D matrix for the map
  let map = new Array(rows).fill(0).map(() => new Array(cols).fill(1));

  // Randomly choose a starting point for the tunnel
  let x = floor(random(1, cols - 1)); // Ensure starting x is within bounds
  let y = floor(random(1, rows - 1)); // Ensure starting y is within bounds

  for (let i = 0; i < MaxTunnels; i++) {
    let length = 0; // Initialize current tunnel length

    while (length < MaxTunnelLength) {
      // Choose a random direction
      let nextDirection = floor(random(4)); 

      // Check the new position based on the direction
      let newX = x;
      let newY = y;

      switch (nextDirection) {
        case 0: // Move right
          newX++;
          break;
        case 1: // Move left
          newX--;
          break;
        case 2: // Move down
          newY++;
          break;
        case 3: // Move up
          newY--;
          break;
      }

      // Check if the new position is within bounds
      if (newX >= 1 && newX < cols - 1 && newY >= 1 && newY < rows - 1) {
        x = newX;
        y = newY;
        map[y][x] = 0; // Set the current cell to floor
        length++; // Increase the tunnel length
      }
    }
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
