class Castle {
  constructor(x) {
    this.width = random(10, 20);
    this.height = random(30, 180);
    this.roof = Math.random() > 0.3;
    this.roof_height = random(10, 100);
    this.x = x;
    this.y = random(0, height);
    this.seed = floor(random(10000, 400000));
  }

  setY(y) {
    this.y = y;
  }

  show() {
    push();
    translate(this.x, this.y + 50 - this.height);
    fill(bg_hue);
    stroke(0);
    strokeWeight(1);
    rect(0, 0, this.width, this.height);

    // shading
    fill(50);
    noStroke();
    for (let y = 0; y < this.height; y += 2) {
      rect(this.width / 2, y, this.width / 2 - 2, 1);
    }

    if (this.roof) {
      beginShape();
      fill(0);
      noStroke();
      vertex(1, 0);
      vertex(this.width - 1, 0);
      vertex(this.width / 2, -this.roof_height);
      endShape();
    }

    pop();
  }
}
