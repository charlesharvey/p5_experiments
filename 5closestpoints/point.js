class Point {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.closest;
    this.closestCount = 0;
    this.r = 5;
  }

  show() {
    fill(255);
    noStroke();

    ellipse(this.pos.x, this.pos.y, this.r, this.r);

    if (this.closest) {
      if (this.closestCount >= 4) {
        fill(0, 255, 255);
        textSize(40);
        text(this.closestCount, this.pos.x + 20, this.pos.y + 20);
      }

      stroke(255, 100);
      noFill();
      line(this.pos.x, this.pos.y, this.closest.pos.x, this.closest.pos.y);
    }
  }
}
