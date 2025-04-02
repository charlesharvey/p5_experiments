// https://www.youtube.com/watch?v=5zI9sG3pjVU

let waves;
const numberoflines = 100;
let m;
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  m = createVector(0, 0);
  waves = [];
  for (let i = 0; i < numberoflines; i++) {
    const h = map(i, 0, numberoflines, 100, height - 100);
    const wave = new Wave(h);
    waves.push(wave);
  }
}

function mouseMoved() {
  m.set(mouseX, mouseY);
}

function draw() {
  background(0);

  waves.forEach((wave) => {
    wave.update();
    wave.disrupt(m);
    wave.show();
  });
}
