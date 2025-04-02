class Player {
  constructor(x, y, dx, dy, color) {
    let xx = x * w - w / 2;
    let yy = y * w - w / 2;
    this.pos = createVector(xx, yy);
    this.vel = createVector(dx, dy);
    this.color = color;
  }

  show() {
    // noStroke();
    // stroke(255);
    // strokeWeight(1);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, w / 2, w / 2);
  }
  update() {
    if (this.pos.x >= width || this.pos.x <= 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y >= height || this.pos.y <= 0) {
      this.vel.y *= -1;
    }

    const cellunder = this.cellUnder();
    if (cellunder) {
      if (cellunder.color == this.color) {
        this.vel.x *= -1;
        this.vel.y *= -1;
        cellunder.flip();
      }
    }

    this.pos.add(this.vel);
  }
  cellUnder() {
    const xx = floor(this.pos.x / w);
    const yy = floor(this.pos.y / w);
    const cell = cells.find((c) => c.x == xx && c.y == yy);
    if (cell) {
      return cell;
    }
  }
}

class Cell {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  show() {
    // stroke(255);
    // strokeWeight(1);
    noStroke();
    fill(this.color);
    rect(this.x * w, this.y * w, w, w);
  }
  flip() {
    this.color = this.color == PLAYER_1_COLOR ? PLAYER_2_COLOR : PLAYER_1_COLOR;
  }
}

let players;
let w, rows, cols, cells;
const PLAYER_1_COLOR = 20;
const PLAYER_2_COLOR = 200;
const SPEED = 8;
function setup() {
  createCanvas(400, 400);

  w = 40;
  rows = floor(width / w);
  cols = floor(height / w);
  cells = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const color = x < cols / 2 ? PLAYER_2_COLOR : PLAYER_1_COLOR;
      const cell = new Cell(x, y, color);
      cells.push(cell);
    }
  }

  players = [];
  const p1 = new Player(
    random(3, 5),
    random(rows / 2 - 4, rows / 2 + 4),
    SPEED,
    SPEED,
    PLAYER_1_COLOR
  );
  const p2 = new Player(
    random(cols - 5, cols - 3),
    random(rows / 2 - 4, rows / 2 + 4),
    -SPEED,
    -SPEED,
    PLAYER_2_COLOR
  );
  players.push(p1);
  players.push(p2);
}

function draw() {
  background(0);

  cells.forEach((cell) => {
    cell.show();
  });
  players.forEach((players) => {
    players.show();
    players.update();
  });
}
