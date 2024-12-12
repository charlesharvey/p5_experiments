const blines = [];

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  for (let i = 0; i < 29; i++) {
    blines.push(new Bline());
  }
}

function draw() {
  background(100, 200, 250);
  blines.forEach((bline) => {
    bline.update();
    bline.show();
  });
}

class Bline {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.places = [this.pos];
    this.dir = Math.random() > 0.5 ? 1 : -1;
    this.places_max_size = random(10, 30);
    this.max_mag = random(10, 40);
  }

  makeNewVertex() {
    const d = random(-this.max_mag, this.max_mag);
    const last = this.places[this.places.length - 1];
    let v;
    if (this.dir > 0) {
      v = createVector(last.x + d, last.y);
    } else {
      v = createVector(last.x, last.y + d);
    }
    this.places.push(v);
    this.dir *= -1;
  }

  update() {
    if (Math.random() < 0.2) {
      this.makeNewVertex();
    }

    if (this.places.length > this.places_max_size) {
      this.places.shift();
    }
  }

  show() {
    // noStroke();
    // fill(255);
    // ellipse(this.pos.x, this.pos.y, 5, 5);

    stroke(255);
    noFill();
    beginShape();
    this.places.forEach((pl) => {
      vertex(pl.x, pl.y);
    });
    endShape();
  }
}
