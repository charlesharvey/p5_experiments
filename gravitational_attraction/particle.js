class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 5;
  }

  gravitate(other) {
    const dist = p5.Vector.dist(other.pos, this.pos);
    const dd = this.r + other.r;
    const limited_dist = max(dist, dd);

    const force = p5.Vector.sub(other.pos, this.pos);
    force.normalize();

    const m1 = this.r;
    const m2 = other.r;
    const strength = (m1 * m2 * g) / (limited_dist * limited_dist);
    force.mult(strength);

    // if (dist > dd) {
    // } else {
    //   force.mult(0);
    // }

    const op_force = force.copy().mult(-1);

    this.applyForce(force);
    other.applyForce(op_force);
  }

  applyForce(force) {
    let f = force.copy();
    this.acc.add(f).limit(120);
  }

  update() {
    this.vel.add(this.acc).limit(10);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}
