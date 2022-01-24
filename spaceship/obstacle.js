class Obstacle {
  constructor() {
    const x = random(-width / 2, width / 2);
    const z = random(-height / 2, height / 2);
    this.pos = createVector(x, 0, z);
  }

  reset() {
    const x = random(-width / 2, width / 2);
    // const z = random(-height / 2, height / 2);
    const z = 500;
    this.pos = createVector(x, 0, z);
  }

  move() {
    this.pos.z -= speed;
  }

  edges() {
    if (this.pos.z < -400) {
      this.reset();
    }
  }

  show() {
    fill(255, 0, 0);
    noStroke();

    // rect(this.pos.x, this.pos.y, this.size, this.size);
    push();
    rotateX(PI / 2);
    translate(this.pos.x, 0, this.pos.z);
    const size = map(this.pos.z, 500, -400, 0.4, 1.5);
    cone(size * 10, size * 70);
    pop();
  }
}
