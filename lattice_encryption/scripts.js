let a, b; //vectors

let ix, iy; // chosen  lattic coordinate

let iix, iiy;
let ii; // xy coord of lattic coor

const grid = 100;
const size = 10;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  chooseAandB();

  chooseIxAndIy();

  iix = a.copy().mult(ix);
  iiy = b.copy().mult(iy);
  ii = p5.Vector.add(iix, iiy);
}

function chooseAandB() {
  a = p5.Vector.random2D().mult(grid); // createVector(0.7, 0.8).mult(grid); //
  b = p5.Vector.random2D().mult(grid); // createVector(-0.4, 0.6).mult(grid); //
  const t = abs(a.angleBetween(b));
  console.log(t);
  if (t > 2.3 || t < 0.8) {
    chooseAandB();
  }
}

function chooseIxAndIy() {
  ix = floor(random(-size / 2, size / 2)); // 2; //
  iy = floor(random(-size / 2, size / 2)); // 3; //

  if (ix == 0 || iy == 0) {
    chooseIxAndIy();
  }
}

function draw() {
  background(0);
  noStroke();
  translate(width / 2, height / 2);

  for (let i = -size; i < size; i++) {
    for (let j = -size; j < size; j++) {
      fill(255);

      const px = a.copy().mult(i);
      const py = b.copy().mult(j);
      const pp = p5.Vector.add(px, py);
      const x = pp.x;
      const y = pp.y;

      text(`${i},${j}`, x + 10, y + 10);

      ellipse(x, y, 3);
    }
  }

  fill(0, 255, 0);
  ellipse(0, 0, 5);

  fill(0, 0, 255);
  ellipse(ii.x, ii.y, 8);

  let hx = ix >= 0 ? 1 : -1;
  let hy = iy >= 0 ? 1 : -1;

  let s = createVector(0, 0);
  let e = createVector(0, 0);
  for (let i = 1; i <= ix * hx; i++) {
    e.add(a.copy().mult(hx));
    drawArrow(s, e);
    s = e.copy();
  }
  for (let j = 1; j <= iy * hy; j++) {
    e.add(b.copy().mult(hy));
    drawArrow(s, e);
    s = e.copy();
  }
}

function drawArrow(s, e) {
  stroke(200, 100);
  strokeWeight(2);
  noFill();
  line(s.x, s.y, e.x, e.y);

  //   let theta = s.copy().add(e).heading();
  //   noStroke();
  //   fill(255, 0, 0);
  //   text(round(theta * 10) / 10, e.x + 0, e.y + 0);

  //   let g = p5.Vector.fromAngle(theta).mult(20).add(b);
  //   line(b.x, b.y, g.x, g.y);

  //   line(x2, y2, x2 + 10, y2 + 10);
  //   line(x2, y2, x2 - 10, y2 - 10);
}
