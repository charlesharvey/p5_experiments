let points;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  reset();
}

function reset() {
  points = [];

  for (let i = 0; i < 300; i++) {
    const p = new Point(random(width), random(height));
    points.push(p);
  }

  const ox = random(width);
  const oy = random(height);
  for (let i = 0; i < 5; i++) {
    const r = 30;
    const x = sin((i / 5) * TWO_PI) * r;
    const y = cos((i / 5) * TWO_PI) * r;
    points.push(new Point(x + ox, y + oy));
  }
  points.push(new Point(ox, oy));

  points.forEach((point) => {
    let closest;
    let closestDi = Infinity;
    points.forEach((other) => {
      if (other !== point) {
        const d = other.pos.dist(point.pos);
        if (d < closestDi) {
          closestDi = d;
          closest = other;
        }
      }
    });
    point.closest = closest;
    closest.closestCount++;
  });
}

function mousePressed() {
  reset();
}
function draw() {
  background(0);

  points.forEach((point) => {
    point.show();

    // if (point.closestCount == 5) {
    //   noLoop();
    // }
  });

  //   reset();
}
