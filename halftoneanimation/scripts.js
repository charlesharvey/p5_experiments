let theta = 0;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
}

function draw() {
  const top = [];

  background(255);
  noStroke();
  fill(235, 239, 10);
  const rows = 25;
  for (let i = -10; i < width / 30 + 10; i++) {
    for (let j = 0; j < rows; j++) {
      let p = j % 2 === 0 ? 0 : 0.5;
      const x = (p + i) * 30 + sin(theta + i / 5 + j / 15) * 4;
      const y = 100 + j * 10 + x / 5 + sin(theta + i / 10) * 9;
      const r =
        map(j, 0, rows, 33, 1) * map(sin(theta + i / 5), -1, 1, 0.9, 1.2);
      //   map(sin(theta + (j * 2 + (i / 10) * TWO_PI) / 5), -1, 1, 9, 20);

      //   if (theta * 20 > (i + j)) {
      ellipse(x, y, r, r);
      //   }

      if (j == 0) {
        top.push(createVector(x, y));
      }
    }
  }

  theta += 0.04;

  //   stroke(0);
  beginShape();
  vertex(-50, -50);
  top.forEach((v) => {
    vertex(v.x, v.y);
  });
  vertex(width + 50, -50);

  endShape();
}
