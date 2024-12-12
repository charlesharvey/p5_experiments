const grid = 70;
let rows, cols;

const options = [50, 100, 170, 255];

let cells;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  rows = Math.floor(height / grid);
  cols = Math.floor(width / grid);

  cells = [];
  for (let i = 0; i < cols; i++) {
    cells[i] = [];
    for (let j = 0; j < rows; j++) {
      cells[i][j] = options;
    }
  }
}

function draw() {
  background(0);
  noStroke();
  frameRate(4);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cell = cells[i][j];
      const cl = cell.length;
      if (cl == 1) {
        const hu = cell[0];
        noStroke();
        fill(0, hu, hu);
        rect(i * grid, j * grid, grid, grid);
      } else {
        // show options;
        cell.forEach((cc, ci) => {
          const hu = cc;
          const ww = grid / cl;
          const xx = i * grid + ci * ww;
          const yy = j * grid;
          fill(0, hu, hu);
          stroke(255);
          strokeWeight(3);
          rect(xx, yy, ww, ww);
        });
      }
    }
  }

  collapseCells();
}

function getLowestEntropyCell() {
  let record_cells = [];
  let record_length = Number.POSITIVE_INFINITY;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cell = cells[i][j];
      if (cell.length > 1) {
        if (cell.length < record_length) {
          record_length = cell.length;
          record_cells = [{ cell, i, j }];
        } else if (cell.length == record_length) {
          record_cells.push({ cell, i, j });
        }
      }
    }
  }

  let record_cell = random(record_cells);
  return record_cell;
}

function collapseCells() {
  const record_cell = getLowestEntropyCell();
  if (record_cell) {
    const i = record_cell.i;
    const j = record_cell.j;
    const cell = record_cell.cell;
    const random_val = random(cell);
    cells[i][j] = [random_val];

    collapseNeighbours(i, j, 0);
  }
}

function collapseNeighbours(i, j, level) {
  if (level < 2) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const xx = i + x;
        const yy = j + y;
        if (xx >= 0 && xx < rows && yy >= 0 && yy < cols) {
          const me = cells[xx][yy];
          const random_val = random(me);
          cells[xx][yy] = [random_val];

          collapseNeighbours(xx, yy, level + 1);
        }
      }
    }
  }
}
