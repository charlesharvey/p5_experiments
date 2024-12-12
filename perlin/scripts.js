const grid = 40;
let gridpoints;

// https://www.youtube.com/watch?v=kCIaHqb60Cw
// https://www.youtube.com/watch?v=kCIaHqb60Cw

let w, h;
let cols, rows;

class GridPoint {
  constructor(x, y) {
    this.pos = createVector(x * grid, y * grid);
    this.x = x;
    this.y = y;
    this.vec = p5.Vector.random2D();
  }

  show() {
    noStroke();

    fill(255);
    ellipse(this.pos.x, this.pos.y, 2, 2);

    const end = this.vec.copy().mult(30);

    // push();
    // translate(this.pos.x, this.pos.y);
    // stroke(255, 0, 0);
    // line(this.vec.x, this.vec.y, end.x, end.y);
    // pop();
  }

  highlight() {
    noStroke();
    fill(255, 255, 0);
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }
}

function setup() {
  // createCanvas(windowWidth - 20, windowHeight - 20);
  createCanvas(200, 200);
  w = width;
  h = height;
  cols = floor(w / grid);
  rows = floor(h / grid);

  gridpoints = [];

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      gridpoints.push(new GridPoint(x, y));
    }
  }
}

function draw() {
  background(0);

  //   gridpoints.forEach((gridpoint) => {
  //     gridpoint.show();
  //   });

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const here = createVector(x, y);
      const closest = closestGrids(here);
      if (closest) {
        let sum = 0;
        closest.forEach((gp) => {
          //   gp.highlight();

          const dis = 1 - gp.pos.dist(here) / grid;

          const v1 = p5.Vector.sub(here, gp.pos).normalize();

          const dp = p5.Vector.dot(v1, gp.vec);

          const ad = dp / dis;
          sum += ad;
        });
        const h = map(sum, -20, 20, 0, 255);
        fill(h);
        noStroke();
        rect(here.x, here.y, 1, 1);
      }
    }
  }
  noLoop();
}

function closestGrids(pos) {
  const x = pos.x;
  const y = pos.y;
  const x1 = floor(x / grid);
  const y1 = floor(y / grid);
  const x2 = ceil(x / grid);
  const y2 = ceil(y / grid);
  const gs = gridpoints.filter(
    (c) =>
      (c.x === x1 && c.y === y1) ||
      (c.x == x2 && c.y == y2) ||
      (c.x == x1 && c.y == y2) ||
      (c.x == x2 && c.y == y1)
  );
  return gs;
}
