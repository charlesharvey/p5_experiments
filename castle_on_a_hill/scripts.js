let theta;
let rho;

let castles;

let bg_hue;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  theta = random(10000, 400000);
  rho = random(10000, 400000);
  castles = [];

  bg_hue = color(254, 240, 210);

  for (let x = 0; x < width; x++) {
    if (Math.random() > 0.94) {
      castles.push(new Castle(x));
    }
  }
}

function draw() {
  setHeights();
  background(bg_hue);

  castles.forEach((castle) => {
    castle.show();
  });

  drawHill();

  drawHillContours();

  noLoop();
  theta += 0.002;
  rho += 0.002;
}

function getY(x) {
  return map(noise(theta + x / 150), 0, 1, height * 0.25, height * 0.75);
}

function setHeights() {
  for (let x = 0; x < width; x++) {
    const y = getY(x);
    castles.forEach((castle) => {
      if (castle.x === x) {
        castle.setY(y);
      }
    });
  }
}

function drawHill() {
  fill(bg_hue);
  strokeWeight(1);
  stroke(0);
  beginShape();
  for (let x = 0; x < width; x++) {
    const y = getY(x);
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape();
}

function drawHillContours() {
  noFill();
  stroke(0);
  strokeWeight(0.8);

  for (let i = 0; i < 30; i++) {
    // beginShape();
    for (let x = 0; x < width; x++) {
      if (Math.random() > 0.5) {
        const y =
          getY(x + i) + map(i * i, 0, 60, 0, 30) * 5 + noise(i + x / 20) * 20;
        //   vertex(x, y);

        drawRandomDots(x, y);
      }
    }
    // endShape();
  }
}

function drawRandomDots(x, y) {
  fill(50);
  noStroke();
  const r = 1;
  const d = 7;

  for (let i = 0; i < random(1, 5); i++) {
    ellipse(x + random(-d, d), y + random(-d, d * 2), r, r);
  }
}
