let points;
let index;
let current, next, leftmost;
let hull;
let nextIndex;
let finished = false;
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  points = [];
  hull = [];
  for (let i = 0; i < 100; i++) {
    const x = random(width);
    const y = random(height);
    points.push(createVector(x, y));
  }

  points.sort((a, b) => a.x - b.x);

  leftmost = points[0];
  current = leftmost;
  next = points[1];
  index = 2;
  nextIndex = -1;

  hull.push(current);
}

function draw() {
  frameRate();
  background(0);
  fill(255);
  noStroke();

  points.forEach((p) => {
    ellipse(p.x, p.y, 5, 5);
  });

  fill(0, 255, 0);
  ellipse(current.x, current.y, 5, 5);

  stroke(255);
  noFill();
  beginShape();
  hull.forEach((p) => {
    vertex(p.x, p.y);
  });
  endShape(CLOSE);

  if (!finished) {
    let checking = points[index];
    stroke(125);
    line(current.x, current.y, checking.x, checking.y);
    line(current.x, current.y, next.x, next.y);

    const a = p5.Vector.sub(next, current);
    const b = p5.Vector.sub(checking, current);
    const cross = a.cross(b);
    if (cross.z < 0) {
      next = checking;
      nextIndex = index;
    }

    index = index + 1;

    if (index == points.length) {
      if (hull.includes(next)) {
        finished = true;
      } else {
        hull.push(next);
        current = next;
        index = 0;
        next = leftmost;
      }
    }
  }
}
