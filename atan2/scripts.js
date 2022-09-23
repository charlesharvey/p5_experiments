const grid = 80;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
}

function draw() {
  background(0);

  strokeWeight(grid / 15);
  for (let x = 0; x < width; x += grid) {
    for (let y = 0; y < height; y += grid) {
      push();
      const phi = atan2(mouseX - x, y - mouseY) + PI / 2;
      translate(x, y);
      rotate(phi);
      stroke(255);

      line(-grid / 4, 0, grid / 4, 0);
      line(-grid / 4, 0, -grid / 7, -grid / 12);
      line(-grid / 4, 0, -grid / 7, grid / 12);
      pop();
    }
  }
}
