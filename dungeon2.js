let cols, rows;
let grid;
let cellSize = 10;
let MaxTunnels = 200;
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
    // Initialize 2D matrix for the map
    let map = new Array(rows).fill(0).map(() => new Array(cols).fill(1));

    // Randomly choose starting point for the tunnel
    let startX = Math.floor(Math.random() * cols);
    let startY = Math.floor(Math.random() * rows);

    // Initialize last directions array
    let lastDirections = [];

    // Loop for the maximum number of tunnels
    for (let i = 0; i < MaxTunnels; i++) {
        // Initialize current tunnel length
        let length = 0;

        // Loop until the maximum length is reached
        while (length < MaxLength) {
            // Choose a random direction
            let direction = Math.floor(Math.random() * 4);

            // If the direction is not the same as the last one or the reverse of the last one
            if (direction !== lastDirections[lastDirections.length - 1] && direction !== (lastDirections[lastDirections.length - 1] + 2) % 4) {
                // Update the last directions array
                lastDirections.push(direction);

                // Update the current tunnel length
                length++;

                // Update the map based on the direction
                switch (direction) {
                    case 0: // Up
                        if (startY > 0 && map[startY - 1][startX] === 1) {
                            map[startY - 1][startX] = 0;
                            startY--;
                        }
                        break;
                    case 1: // Right
                        if (startX < cols - 1 && map[startY][startX + 1] === 1) {
                            map[startY][startX + 1] = 0;
                            startX++;
                        }
                        break;
                    case 2: // Down
                        if (startY < rows - 1 && map[startY + 1][startX] === 1) {
                            map[startY + 1][startX] = 0;
                            startY++;
                        }
                        break;
                    case 3: // Left
                        if (startX > 0 && map[startY][startX - 1] === 1) {
                            map[startY][startX - 1] = 0;
                            startX--;
                        }
                        break;
                }
            }
        }
    }

    return map;
}

function drawMap() {
    // Loop through the map
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            // If the cell is a wall, fill it with black
            if (grid[y][x] === 1) {
                fill(0);
            } else { // If the cell is a floor, fill it with white
                fill(255);
            }

            // Draw the cell
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}