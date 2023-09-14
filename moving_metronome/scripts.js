class Bezier {
  constructor(p1, p2, c1, c2) {
    this.p1 = p1;
    this.p2 = p2;
    this.c1 = c1;
    this.c2 = c2;
    this.points;
    this.makeCurve();
  }

  makeCurve() {
    this.points = [];

    for (let p = 0; p < 100; p++) {
      const percentage = p / 100;
      const d1 = p5.Vector.lerp(this.p1, this.c1, percentage);
      const d2 = p5.Vector.lerp(this.c1, this.p2, percentage);
      const p11 = p5.Vector.lerp(d1, d2, percentage);
      const d3 = p5.Vector.lerp(this.p1, this.c2, percentage);
      const d4 = p5.Vector.lerp(this.c2, this.p2, percentage);
      const p22 = p5.Vector.lerp(d3, d4, percentage);
      const g1 = p5.Vector.lerp(p11, p22, percentage);
      this.points.push(g1);
    }
  }

  show() {
    stroke(100, 255, 255);
    strokeWeight(3);
    noFill();
    beginShape();
    this.points.forEach((b) => {
      vertex(b.x, b.y);
    });
    endShape();
  }
}

let bezier;
let tx1, ty1;
let cx1, cy1;
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  tx1 = random(10000);
  ty1 = random(10000);

  bezier = [];

  let c1 = newRandomV(noise(tx1), noise(ty1));
  let p1 = newRandomV(noise(cx1), noise(cy1));
  increaseNoiseValues();
  let c2 = newRandomV(noise(tx1), noise(ty1));
  let p2 = newRandomV(noise(cx1), noise(cy1));

  for (let i = 0; i < 10; i++) {
    const cv = new Bezier(p1, p2, c1, c2);
    bezier.push(cv);
    increaseNoiseValues();
    p1 = p2;
    p2 = newRandomV(noise(tx1), noise(ty1));
    c1 = c2;
    c2 = newRandomV(noise(cx1), noise(cy1));
  }
}

function increaseNoiseValues() {
  tx1 += 0.05;
  ty1 += 0.05;
  cx1 += 0.05;
  cy1 += 0.05;
}

function newRandomV(x = null, y = null) {
  if (x == null) {
    x = Math.random();
  }
  if (y == null) {
    y = Math.random();
  }

  return createVector(x * width, y * height);
}
function draw() {
  background(0);

  bezier.forEach((cv) => {
    cv.show();
  });
}
