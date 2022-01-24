let points;

const range = 5;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  reset();
}

function reset() {
  points = [];
  for (let i = 0; i < 3; i++) {
    const point = createVector(random(-range, range), random(-range, range));
    points.push(point);
  }
}

function mouseClicked() {
  reset();
}

function draw() {
  background(0);

  stroke(100);
  strokeWeight(1);
  noFill();

  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);

  noStroke();
  fill(255, 0, 0);
  points.forEach((point) => {
    const x = resizeX(point.x);
    const y = resizeY(point.y);
    ellipse(x, y, 8, 8);
  });

  points.forEach((point) => {
    const others = points.filter((p) => p != point);

    for (let x = -range; x < range; x++) {
      let y = 1;
      let den = 1;
      others.forEach((other) => {
        y = y * (x - other.x);
        den = den * (point.x - other.x);
      });

      y = y / den;

      y = resizeY(y);
      x = resizeX(x);

      fill(255);
      noStroke(0);

      ellipse(x, y, 3, 3);

      // (x-bx)(x-cx)(x-dx);
    }
  });
}

function resizeX(x) {
  return map(x, -range, range, 0, width);
}
function resizeY(y) {
  return map(y, -range, range, 0, height);
}
