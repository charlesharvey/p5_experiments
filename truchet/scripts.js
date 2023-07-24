const GRID_SIZE = 40;
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
}

function draw() {
  background(0);

  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const idi = Math.floor(x / GRID_SIZE);
      const idj = Math.floor(y / GRID_SIZE);
      const tru1 = truchet(x % GRID_SIZE, y % GRID_SIZE, idi, idj);
      set(x, y, tru1);
    }
  }
  updatePixels();

  noLoop();
}

function hash(i, j) {
  var x = Math.sin(i * 123789 + j * 18290) * 10001;
  return x - Math.floor(x);
}

function truchet(i, j, idi, idj) {
  if (hash(idi, idj) > 0.5) {
    i = GRID_SIZE - i;
  }

  let x = map(i, 0, GRID_SIZE, 0, 1) - 0.5; // from 0-100 to -0.5 0.5
  let y = map(j, 0, GRID_SIZE, 0, 1) - 0.5;

  let cd1 = distance(x + 0.5, y + 0.5, 0, 0);
  let cd2 = distance(x - 0.5, y - 0.5, 0, 0);
  let cd = Math.min(cd1, cd2);

  const blur = 0.01;
  const thickness = 0.04;
  cd = smoothstep(blur, -blur, Math.abs(cd - 0.5) - thickness);

  const b = map(cd, 0, 1, 0, 255);

  return color(b, b, b);
}

function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}
