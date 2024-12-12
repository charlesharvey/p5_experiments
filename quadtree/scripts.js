let tree, boundary;

let points;

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

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.theta = random(20000);
    this.move();
    this.node;
  }

  show() {
    fill(255);

    noStroke();

    ellipse(this.x, this.y, 5, 5);
  }

  move() {
    this.x = map(noise(this.theta + 1), 0, 1, 0, width);
    this.y = map(noise(this.theta + 10000), 0, 1, 0, height);
    this.theta += 0.001;
  }

  parentRect() {
    if (this.node) {
      if (this.node.parent) {
        return this.node.parent.boundary;
      }
    }
  }
}

function mouseClicked() {
  reset();
}

// function mouseClicked() {
//   const g = 70;
//   for (let i = 0; i < 10; i++) {
//     const point = new Point(mouseX + random(g, -g), mouseY + random(g, -g));
//     setTimeout(() => {
//       tree.insert(point);
//     }, i * 60);
//   }
// }

function mouseMoved() {
  this.box.x = mouseX - this.box.w / 2;
  this.box.y = mouseY - this.box.h / 2;
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  points = [];
  for (let i = 0; i < 200; i++) {
    const point = new Point(
      random(width * 0.1, width * 0.9),
      random(height * 0.1, height * 0.9)
    );
    points.push(point);
  }

  box = new Rectangle(width / 2 - 50, height / 2 - 50, 100, 100);
  // box.highlighted = true;
}

function draw() {
  background(0);

  tree = new Quadtree(0, 0, width, height, 1);

  points.forEach((point) => {
    point.move();
    tree.insert(point);
  });

  points.forEach((point) => {
    // const boundary = point.parentRect();
    const size = 150;
    const boundary = new Rectangle(
      point.x - size / 2,
      point.y - size / 2,
      size,
      size
    );
    if (boundary) {
      let nest = tree.query(boundary);
      nest.forEach((n) => {
        const d = dist(n.x, n.y, point.x, point.y);
        const b = map(d, 0, size / 2, 200, 0);
        stroke(255, b);
        strokeWeight(1);
        line(n.x, n.y, point.x, point.y);
      });
    }
  });

  // tree.show();

  let results = tree.query(box);
  // box.show();
  noStroke();
  fill(255);
  results.forEach((p) => {
    ellipse(p.x, p.y, 9, 9);
  });
}
