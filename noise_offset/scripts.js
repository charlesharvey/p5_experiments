let xoff = 0;
let yoff = 0;

const sp = 0.02;
let cx = 11.5;
let cy = 3.3;
const g = 200;

function setup() {
  createCanvas(200, 200);
  //   windowWidth - 20, windowHeight - 20
}

function draw() {
  background(0);

  let ml = map(sin(frameCount / 100), -1, 1, 0, 1);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let blahx = x / g + cos(x + yoff / 1 / frameCount);
      let blahy = y / g + sin(y + xoff / 1 / frameCount);

      let xf = xoff + x / cx + ml * blahx;
      let yf = yoff + y / cy + ml * blahy;

      const n = map(noise(xf, yf), 0, 1, 0, 255);

      set(x, y, n);
    }
  }

  updatePixels();

  xoff += 0.02;
  yoff += 0.02;
}
