const grid = 15;
const NEIGHBOURS_NEEDED = 3;

let cols, rows, cells;

const ROCK = 10; // red
const SCISSOR = 100; // green
const PAPER = 170; // blue

class Cell {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.new_hue;
    this.neighbours;
    this.setRandomHue();
  }

  setRandomHue() {
    const ra = Math.random();
    this.hue = ra > 0.333 ? (ra > 0.666 ? ROCK : SCISSOR) : PAPER;
  }

  setNeighbours(others) {
    this.neighbours = [];

    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        const x = (a + this.x + cols) % cols;
        const y = (b + this.y + rows) % rows;
        const ot = others.find((o) => o.x == x && o.y == y && o !== this);
        if (ot) {
          this.neighbours.push(ot);
        }
      }
    }
  }

  show() {
    noStroke();
    fill(this.hue, 200, 200);
    rect(this.x * grid, this.y * grid, grid, grid);
  }

  calcNewHue() {
    let rs = 0;
    let ss = 0;
    let ps = 0;
    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        const x = (a + this.x + cols) % cols;
        const y = (b + this.y + rows) % rows;
        const o = this.neighbours.find((o) => o.x == x && o.y == y);
        if (o) {
          if (o.hue == ROCK) {
            rs++;
          } else if (o.hue == SCISSOR) {
            ss++;
          } else if (o.hue == PAPER) {
            ps++;
          }
        }
      }
    }
    if (rs >= NEIGHBOURS_NEEDED && this.hue == SCISSOR) {
      this.new_hue = ROCK;
    } else if (ss >= NEIGHBOURS_NEEDED && this.hue == PAPER) {
      this.new_hue = SCISSOR;
    } else if (ps >= NEIGHBOURS_NEEDED && this.hue == ROCK) {
      this.new_hue = PAPER;
    }
  }

  setNewHue() {
    if (this.new_hue) {
      this.hue = this.new_hue;
      this.new_hue = null;
    }
  }
}

function mouseClicked() {
  reset();
}

function reset() {
  cells.forEach((cell) => {
    cell.setRandomHue();
  });
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 255);
  cols = ceil(width / grid);
  rows = ceil(height / grid);
  cells = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const cell = new Cell(x, y);
      cells.push(cell);
    }
  }
  cells.forEach((cell) => {
    cell.setNeighbours(cells);
  });
}

function draw() {
  cells.forEach((cell) => {
    cell.show();
    cell.calcNewHue();
  });

  cells.forEach((cell) => {
    cell.setNewHue();
  });
}
