const spacing = 5;
const sq_size = 1;
const ci_size = 170;

let theta = 0;
let tree;

// let mousex,mousey;

let circle = { x: 0, y: 0, vel: 1 };

let points = [];

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  circle.x = width / 2;
  circle.y = height / 2;

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      const p = new Point(x, y);
      points.push(p);
    }
  }

  tree = new Quadtree(0, 0, width, height, 1);

  points.forEach((point) => {
    tree.insert(point);
  });
}

function mouseMoved() {}

function draw() {
  background(202, 210, 197);

  noStroke();

  const rd =
    ci_size *
    map(constrain(circle.vel, 0, 500), 0, 500, 1, 0.5) *
    map(sin(theta * 0.6), 1, -1, 1, 1.2);

  // // // circles
  // fill(182, 200, 157);
  // ellipse(circle.x, circle.y, rd * 1.3, rd * 1.3);

  // circly squares

  fill(47, 62, 70);

  const boundary = new Rectangle(circle.x - rd, circle.y - rd, rd * 2, rd * 2);
  // boundary.show();
  const pointsinboundary = tree.query(boundary);

  points.forEach((p) => {
    let sz = sq_size;

    if (pointsinboundary.includes(p)) {
      const d = dist(p.x, p.y, circle.x, circle.y);
      if (d < rd * 0.8) {
        sz = sq_size + 2;
      } else if (d < rd) {
        sz = sq_size + 1;
      }
    } else {
    }
    rect(p.x, p.y, sz, sz);
  });

  calculateCircle();
  theta += 0.07;

  if (frameCount % 100 == 0) {
    console.log(frameRate());
  }
}

function calculateCircle() {
  const dx = abs(circle.x - mouseX);
  const dy = abs(circle.y - mouseY);
  const vel = sqrt(dx * dx + dy * dy);
  circle.x = lerp(circle.x, mouseX, 0.051);
  circle.y = lerp(circle.y, mouseY, 0.051);
  circle.vel = vel;
}

class Quadtree {
  constructor(x, y, w, h, capacity) {
    this.boundary = new Rectangle(x, y, w, h);
    this.capacity = capacity;
    this.points = [];
    this.nw;
    this.ne;
    this.sw;
    this.se;
    this.subdivided = false;
    this.parent;
  }

  show() {
    this.boundary.show();
    this.points.forEach((p) => {
      p.show();
    });

    if (this.subdivided) {
      this.nw.show();
      this.ne.show();
      this.sw.show();
      this.se.show();
    }
  }

  insert(point) {
    if (this.boundary.contains(point)) {
      if (this.points.length < this.capacity) {
        this.points.push(point);
        point.node = this;
      } else {
        if (!this.subdivided) {
          this.subdivide();
        }
        this.nw.insert(point);
        this.ne.insert(point);
        this.sw.insert(point);
        this.se.insert(point);
      }
    }
  }

  subdivide() {
    const b = this.boundary;
    const w = b.w / 2;
    const h = b.h / 2;

    const nwx = b.x;
    const nwy = b.y;
    const nex = b.x + w;
    const ney = b.y;
    const swx = b.x;
    const swy = b.y + h;
    const sex = b.x + w;
    const sey = b.y + h;

    this.nw = new Quadtree(nwx, nwy, w, h, this.capacity);
    this.ne = new Quadtree(nex, ney, w, h, this.capacity);
    this.sw = new Quadtree(swx, swy, w, h, this.capacity);
    this.se = new Quadtree(sex, sey, w, h, this.capacity);
    this.subdivided = true;
    this.parent = this;
  }

  query(range, found = []) {
    if (this.boundary.intersects(range)) {
      this.points.forEach((p) => {
        if (range.contains(p)) {
          found.push(p);
        }
      });

      if (this.subdivided) {
        this.nw.query(range, found);
        this.ne.query(range, found);
        this.sw.query(range, found);
        this.se.query(range, found);
      }
    }
    return found;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.highlighted;
  }

  show() {
    noFill();
    stroke(255);
    strokeWeight(1);

    if (this.highlighted) {
      stroke(255, 255, 0);
      strokeWeight(2);
    }

    rect(this.x, this.y, this.w, this.h);
  }

  contains(point) {
    if (point.x >= this.x && point.x < this.x + this.w) {
      if (point.y >= this.y && point.y < this.y + this.h) {
        return true;
      }
    }
    return false;
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}
