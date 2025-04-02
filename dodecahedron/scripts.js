let phi = 1.618033;
let r = 90;
let theta = 0.3;
let rho = 0;
let coords;

let path;
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20, WEBGL);

  reset();
}
function mouseDragged() {
  r = map(mouseX, 0, width, 10, 200);
  rho = map(mouseY, 0, height, 0, TWO_PI);
  //   phi = map(mouseY, 0, height, 1, 2);
  //   reset();
}

function reset() {
  coords = [
    [0, 1 / +phi, +phi],
    [0, 1 / -phi, +phi],
    [0, 1 / +phi, -phi],
    [0, 1 / -phi, -phi],
    [1 / +phi, +phi, 0],
    [1 / -phi, +phi, 0],
    [1 / +phi, -phi, 0],
    [1 / -phi, -phi, 0],
    [+phi, 0, 1 / +phi],
    [-phi, 0, 1 / +phi],
    [+phi, 0, 1 / -phi],
    [-phi, 0, 1 / -phi],
    [+1, +1, +1],
    [-1, +1, +1],
    [+1, -1, +1],
    [-1, -1, +1],
    [+1, +1, -1],
    [-1, +1, -1],
    [+1, -1, -1],
    [-1, -1, -1],
  ];

  path = [];
}
function draw() {
  background(255, 0, 0);

  noFill();

  stroke(255);
  strokeWeight(6);

  rotateZ((rho + theta) / 3);
  rotateY((rho + theta) / 7);
  rotateX((rho + theta) / 9);
  theta += 0.012;

  // coords.forEach((c, i) => {
  //   let [x, y, z] = c;
  //   x *= r;
  //   y *= r;
  //   z *= r;
  //   point(x, y, z);
  // });

  stroke(255);
  strokeWeight(2);
  drawLine(coords[0], coords[12]);
  drawLine(coords[12], coords[4]);
  drawLine(coords[4], coords[5]);
  drawLine(coords[5], coords[13]);
  drawLine(coords[13], coords[0]);

  drawLine(coords[0], coords[1]);
  drawLine(coords[1], coords[14]);
  drawLine(coords[14], coords[8]);
  drawLine(coords[8], coords[12]);

  drawLine(coords[1], coords[15]);
  drawLine(coords[15], coords[9]);
  drawLine(coords[9], coords[13]);

  drawLine(coords[15], coords[7]);
  drawLine(coords[7], coords[6]);
  drawLine(coords[6], coords[14]);

  drawLine(coords[7], coords[19]);
  drawLine(coords[19], coords[11]);
  drawLine(coords[11], coords[9]);

  drawLine(coords[3], coords[2]);
  drawLine(coords[2], coords[16]);
  drawLine(coords[16], coords[10]);
  drawLine(coords[10], coords[18]);
  drawLine(coords[18], coords[3]);

  drawLine(coords[17], coords[2]);
  drawLine(coords[17], coords[5]);

  drawLine(coords[17], coords[11]);

  drawLine(coords[3], coords[19]);

  drawLine(coords[4], coords[16]);

  drawLine(coords[6], coords[18]);

  drawLine(coords[8], coords[10]);

  // if (frameCount % 10 == 0) {
  //   const c1 = coords[0];
  //   path.push(new createVector(c1[0] * r, c1[1] * r, c1[2] * r));
  // }

  // stroke(255);
  // strokeWeight(1);
  // beginShape();
  // path.forEach((p) => {
  //   vertex(p);
  // });
  // endShape();
}

function drawLine(p1, p2) {
  line(p1[0] * r, p1[1] * r, p1[2] * r, p2[0] * r, p2[1] * r, p2[2] * r);
}
