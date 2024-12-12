class Puppy {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.r = 40;
  }

  update() {
    this.edges();

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.vel.mult(0);
    this.acc.mult(0.9);
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  move(dir) {
    if (dir == "up") {
      this.acc.y = -this.maxSpeed;
    }
    if (dir == "down") {
      this.acc.y = this.maxSpeed;
    }
    if (dir == "left") {
      this.acc.x = -this.maxSpeed;
    }
    if (dir == "right") {
      this.acc.x = this.maxSpeed;
    }
  }

  jump() {
    this.acc.y = -this.maxSpeed;
    setTimeout(() => {
      this.acc.y = this.maxSpeed;
    }, 500);
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = 0 - this.r;
    } else if (this.pos.x < 0 - this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = 0 - this.r;
    } else if (this.pos.y < 0 - this.r) {
      this.pos.y = height + this.r;
    }
  }
}
