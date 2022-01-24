class Planet {
  constructor() {
    this.pos = createVector(
      random(100, width - 100),
      random(100, height - 100)
    );
    this.vel = p5.Vector.random2D();
    this.acc = p5.Vector.random2D();
    this.mass = random(50, 400);
    this.r = map(this.mass, 0, 400, 0, 20);
    this.hue = random(255);
    this.history = [];
  }

  makeSun() {
    this.pos.set(width / 2, height / 2);
    this.vel.mult(0);
    this.acc.mult(0);
    this.mass = 60000;
    this.r = 30;
    this.hue = 50;
  }

  update() {
    this.acc.div(this.mass);
    this.pos.add(this.vel);

    this.vel.add(this.acc);
    this.acc.mult(0);

    this.history.push(this.pos.copy());
    if (this.history.length > 300) {
      this.history.shift();
    }
  }

  gravitate(other) {
    const dist = p5.Vector.dist(other.pos, this.pos);
    const m1 = this.mass;
    const m2 = other.mass;
    const g = 2;

    const force = (m1 * m2 * g) / (dist * dist);
    const v = p5.Vector.sub(other.pos, this.pos);
    v.normalize().mult(force).limit(30);
    this.applyForce(v);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    noStroke();

    this.history.forEach((v, vi) => {
      const br = map(
        Math.pow(vi, 2),
        0,
        Math.pow(this.history.length, 2),
        0,
        30
      );
      fill(this.hue, 50, br);
      ellipse(v.x, v.y, 2, 2);
    });

    fill(this.hue, 100, 100);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);

    // SHOW VELOCITY
    // const vc = this.vel.copy().mult(10);
    // stroke(this.hue, 20, 20);
    // strokeWeight(1);
    // line(this.pos.x, this.pos.y, this.pos.x + vc.x, this.pos.y + vc.y);
  }
}
