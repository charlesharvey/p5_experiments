let lines;

class Line {
  constructor() {
    this.maxSize = min(width, height) / 10;
    this.maxLength;
    this.t = 0;
    this.reset();
  }

  reset() {
    this.maxLength = random(10, 40);
    this.points = [];
    this.t = 0;
    const v = createVector(random(width), random(height), random(-100, 100));
    this.points.push(v);
  }

  addPoint() {
    const newcurrent = this.points[this.points.length - 1].copy();
    newcurrent.x += random(-this.maxSize, this.maxSize);
    newcurrent.y += random(-this.maxSize, this.maxSize);
    newcurrent.z += random(-30, 30);
    this.points.push(newcurrent);
  }

  grow() {
    this.t = 0;
    if (this.points.length < this.maxLength) {
      this.addPoint();
    } else {
      this.reset();
    }
  }

  show() {
    stroke(255);
    noFill();
    this.points.forEach((p, pi) => {
      if (pi < this.points.length - 2) {
        const bb = map(p.z, -100, 100, 0, 255);
        const j = this.points[pi + 1];
        stroke(bb);
        line(p.x, p.y, j.x, j.y);
      }
    });

    if (this.points.length > 2) {
      const e = this.points[this.points.length - 2];
      const f = this.points[this.points.length - 1];
      const nx = lerp(e.x, f.x, this.t);
      const ny = lerp(e.y, f.y, this.t);
      line(e.x, e.y, nx, ny);
    }
  }

  update() {
    this.t += 0.1;

    if (this.t >= 1) {
      this.grow();
    }
  }
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  lines = [];

  for (let i = 0; i < 30; i++) {
    addLine();
  }
}

function addLine() {
  lines.push(new Line());
}

function draw() {
  background(0);

  lines.forEach((line) => {
    line.show();
    line.update();
  });
}
