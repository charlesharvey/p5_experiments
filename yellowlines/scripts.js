let lines;
let theta = 0;
const noPoints = 10;
const noLines = 30;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  resetLines();
}

function resetLines() {
  lines = [];
  for (let j = 0; j < noLines; j++) {
    lines[j] = [];
    for (let i = 0; i < noPoints; i++) {
      lines[j].push(createVector());
    }
  }
}

function calculateLines() {
  lines.forEach((l, li) => {
    l.forEach((v, vi) => {
      const w = map(li, 0, lines.length - 1, 0, width);
      const y = map(vi, 0, l.length - 1, 0, height);
      const x = map(noise(vi / 2 + li / 18 + theta), 0, 1, w - 150, w + 150);
      v.x = x;
      v.y = y;
    });
  });
}

function draw() {
  background(255, 255, 0);

  noFill();
  stroke(0);
  strokeWeight(9);

  lines.forEach((l) => {
    beginShape();
    l.forEach((v) => {
      vertex(v.x, v.y);
    });
    endShape();
  });

  theta += 0.001;
  calculateLines();
}
