let grid;
let cols, rows;
let bools_x, bools_y;

let prob;
let gamma, maxGamma;
let omicron;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  prob = 0.5;
  grid = min(width, height) / 24;
  reset();
}

function reset() {
  cols = floor(width / grid);
  rows = floor(height / grid);

  bools_x = [];
  bools_y = [];

  for (let x = 0; x < cols; x++) {
    if (Math.random() > prob) {
      bools_x[x] = 1;
    } else {
      bools_x[x] = 0;
    }
  }
  for (let y = 0; y < rows; y++) {
    if (Math.random() > prob) {
      bools_y[y] = 1;
    } else {
      bools_y[y] = 0;
    }
  }

  omicron = 0;
  gamma = 0;
  maxGamma = max(rows, cols);
}

function mouseMoved() {
  //   prob = map(mouseX, 0, width, 0, 1);
  //   reset();
}

function draw() {
  background(0);

  fill(255);
  noStroke();
  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      ellipse(x * grid, y * grid, 2, 2);
    }
  }

  stroke(255);
  noFill();
  strokeWeight(1);

  for (let x = 0; x <= cols; x++) {
    let yy = 0;
    const b = bools_x[x];
    if (b % 2 == 0) {
      yy = 1;
    }
    for (let y = 0; y < cols; y += 2) {
      if (y < gamma && x < gamma) {
        line(x * grid, (y + yy) * grid, x * grid, (y + yy + 1) * grid);
      }
    }
  }

  for (let y = 0; y <= rows; y++) {
    let xx = 0;
    const b = bools_y[y];
    if (b % 2 == 0) {
      xx = 1;
    }
    for (let x = 0; x < cols; x += 2) {
      if (y < gamma && x < gamma) {
        line((x + xx) * grid, y * grid, (x + xx + 1) * grid, y * grid);
      }
    }
  }

  gamma += 0.33;
  if (gamma > maxGamma + 15) {
    reset();
  }

  // fill in squares
  // if (gamma > maxGamma) {
  //   for (let x = 0; x <= cols; x++) {
  //     for (let y = 0; y <= rows; y++) {
  //       if (x < omicron && y < omicron) {
  //         fill(0, 255, 0);
  //         noStroke();
  //         rect(x * grid, y * grid, grid, grid);
  //       }
  //     }
  //   }

  //   omicron++;
  // }
}
