let font;

let lights = [];

let shapes = [];
let mouse;
let mountain = [];

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

class Shaaape {
  constructor(points) {
    this.points = points;
    this.bottom_points = this.bottom();
  }

  bottom() {
    const ys = this.points.map((p) => p.y);
    const maxy = max(ys);
    return this.points.filter((p) => p.y == maxy);
  }

  show() {
    noStroke();
    fill(0);

    beginShape();
    this.points.forEach((p) => {
      vertex(p.x, p.y);
    });
    endShape();
  }

  shadow() {
    if (mouse) {
      fill(117, 117, 55);

      const a = this.points[0];
      const b = this.points[1];
      const c = this.points[2];
      const d = this.points[3];
      const sets = [
        [a, b],
        [b, c],
        [c, d],
        [d, a],
      ];
      sets.forEach((s) => {
        beginShape();

        s.forEach((c) => {
          vertex(c.x, c.y);
        });
        vertex(mouse.x, height);
        endShape();
      });
      // beginShape();
      // vertex(mouse.x, height);
      // this.bottom_points.forEach((p) => {
      //   vertex(p.x, p.y);
      // });
      // endShape();
    }
  }
}

function preload() {
  // font = loadFont("/agenda.ttf");
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  // console.log(font);

  // for (let i = 0; i < 7; i++) {
  //   const x = random(0, width);
  //   const w = random(20, 300);
  //   const l = new Light(x, w);
  //   lights.push(l);
  // }

  shapes = [];

  const dots = 11;
  for (let i = 0; i < dots; i++) {
    const y = i % 2 == 0 ? 100 : 250;
    const x = map(i, 0, dots, 0, width);
    const pts = createSquare(x, y, (width / dots) * 0.7);
    shapes.push(new Shaaape(pts));
  }

  mouse = createVector(0, 0);

  mountain = [];
  const res = 10;
  for (let x = 0; x < width; x += res) {
    const y = map(noise(x * 0.006), 0, 1, height * 0.99, height * 0.7);
    mountain.push(createVector(x, y));
  }
}

function createSquare(x, y, w) {
  const a = createVector(x, y);
  const b = createVector(x + w, y);
  const c = createVector(x + w, y + w);
  const d = createVector(x, y + w);

  return [a, b, c, d];
}

function mouseMoved() {
  if (mouse) {
    mouse.x = mouseX;
    mouse.y = mouseY;
  }
}

function draw() {
  background(200, 200, 0);
  // lights.forEach((l) => {
  //   l.show();
  // });

  shapes.forEach((shp) => {
    shp.shadow();
  });
  shapes.forEach((shp) => {
    shp.show();
  });

  fill(40);
  beginShape();
  vertex(0, height);
  mountain.forEach((p) => {
    vertex(p.x, p.y);
  });
  vertex(width, height);
  endShape();
}
