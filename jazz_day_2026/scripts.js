let font;

let lights = [];

class Light {
  constructor(x, w) {
    this.x1 = x;
    this.w = w;
    this.x2 = this.x1 + this.w;
    this.theta = random(1, 100);
    this.speed = random(1, 5);
  }

  show() {
    noStroke();
    fill(255, 255, 0, 50);

    const x1 = map(noise(this.theta), 0, 1, 0, width);
    // const x2 = map(noise(this.theta + 5), 0, 1, 0, width);
    const wd = map(noise(this.theta + 0.1), 0, 1, 20, 600);
    const x2 = x1 + wd + this.w;

    // beginShape();
    // vertex(this.x1, height);
    // vertex(this.x2, height);
    // vertex(x1, 0);
    // vertex(x2, 0);
    // endShape();

    quad(this.x1, height, this.x2, height, x2, 0, x1, 0);

    this.theta += this.speed * 0.001;
  }
}

function preload() {
  // font = loadFont("/agenda.ttf");
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  // console.log(font);

  for (let i = 0; i < 7; i++) {
    const x = random(0, width);
    const w = random(20, 300);
    const l = new Light(x, w);
    lights.push(l);
  }
}

function draw() {
  background(0);
  lights.forEach((l) => {
    l.show();
  });
}
