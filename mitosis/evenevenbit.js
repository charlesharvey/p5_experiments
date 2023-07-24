class Evenevenbit {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(), random());
    this.acc = createVector(0, 0);
    this.hue = random(100, 200);
    this.r = 5;
    this.repelForce = 5;
    this.attractForce = 4;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  attract(target) {
    const force = p5.Vector.sub(target, this.pos);
    let dir2 = force.magSq(); // square the distance between the target and current position;
    // dir2 = constrain(dir2, 0, 50);
    const g = 72.987;
    const strength = (g / dir2) * this.attractForce;
    force.setMag(strength);
    this.applyForce(force);
  }

  repel(target) {
    const d = dist(target.x, target.y, this.pos.x, this.pos.y);
    if (d < this.r * 2) {
      const force = p5.Vector.sub(target, this.pos);
      let dir2 = force.magSq(); // square the distance between the target and current position;
      dir2 = constrain(dir2, 0, 50);
      const g = -1.987;
      const strength = (g / dir2) * this.repelForce;
      force.setMag(strength);
      this.applyForce(force);
    }
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(0.6);
    this.acc.mult(0); // createVector(0, 0);
  }

  show() {
    noStroke();
    fill(150, 255 - this.hue, this.hue, 80);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}
