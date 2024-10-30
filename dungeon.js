let cols, rows;
let grid;
let cellSize = 10; // Size of a single tunnel cell
let MaxTunnels = 300; // Maximum number of tunnels allowed on a map

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

  // Randomly choose a starting point for the tunnel within x and y bounds
  let startX = floor(random(1, cols/2 - 1));
  let startY = floor(random(1, rows/2 - 1));

  // Start digging from the starting point
  let MaxTunnelLength = random(5, 10);
  digTunnel(map, startX, startY, MaxTunnelLength);

  // Create multiple tunnels
  for (let i = 0; i < MaxTunnels; i++) {
    // Choose a random cell that is already part of a tunnel
    let tunnelCells = getTunnelCells(map);
    if (tunnelCells.length === 0) break;
    let cell = random(tunnelCells);
    let x = cell.x;
    let y = cell.y;

    MaxTunnelLength = random(5, 10);

    // Dig a new tunnel from the chosen cell
    digTunnel(map, x, y, MaxTunnelLength);
  }

  return map;
}

// Function to dig a tunnel from a given cell
function digTunnel(map, x, y, length) {
  let directions = [
    { x: 1, y: 0 }, // Right
    { x: -1, y: 0 }, // Left
    { x: 0, y: 1 }, // Down
    { x: 0, y: -1 } // Up
  ];

  // Choose a random direction
  let direction = random(directions);
  let tunnelColor = floor(random(2, 5));

  for (let i = 0; i < length; i++) {
    // Check if the new position is within bounds
    let newX = x + direction.x;
    let newY = y + direction.y;

    if (newX >= 1 && newX < map[0].length - 1 && newY >= 1 && newY < map.length - 1) {
      // Check if the new position is not already part of a tunnel
      if (map[newY][newX] === 1) {
        // Set the current cell to floor
        map[newY][newX] = tunnelColor;
        x = newX;
        y = newY;
      } else {
        // If the new position is already part of a tunnel, stop digging
        break;
      }
    } else {
      // If the new position is out of bounds, stop digging
      break;
    }
  }
}

// Function to get all cells that are part of a tunnel
function getTunnelCells(map) {
  let tunnelCells = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] !== 1) {
        tunnelCells.push({ x: j, y: i });
      }
    }
  }
  return tunnelCells;
}

function drawMap() {
  background(255);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        fill(0);
      } else if (grid[i][j] === 2) {
        fill(225, 0, 0);
      } else if (grid[i][j] === 3) {
        fill(0, 255, 0);
      } else if (grid[i][j] === 4) {
        fill(0, 0, 255);
      } else {
        fill(225);
      }
      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}
