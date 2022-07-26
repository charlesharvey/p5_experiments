let range = 5;
let res = 0.05;

let a, b, c, d;
let l1s, l2s, l3s, l4s, fin;
let thetaa, thetab, thetac, thetad;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  a = createVector();
  b = createVector();
  c = createVector();
  d = createVector();
  reset();
}

function draw() {
  background(0);

  //lines

  calculateLines();

  noFill();
  strokeWeight(1);
  stroke(80);
  beginShape();
  l1s.forEach((p) => {
    vertex(resizeX(p.x), resizeY(p.y));
  });
  endShape();
  beginShape();
  l2s.forEach((p) => {
    vertex(resizeX(p.x), resizeY(p.y));
  });
  endShape();
  beginShape();
  l3s.forEach((p) => {
    vertex(resizeX(p.x), resizeY(p.y));
  });
  endShape();
  beginShape();
  l4s.forEach((p) => {
    vertex(resizeX(p.x), resizeY(p.y));
  });
  endShape();

  stroke(255, 255, 0);
  strokeWeight(2);
  beginShape();
  fin.forEach((p) => {
    vertex(resizeX(p.x), resizeY(p.y));
  });
  endShape();

  // axes
  stroke(200);
  strokeWeight(1);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);

  // points
  const size = 12;
  noStroke();
  fill(255, 100, 0);
  ellipse(resizeX(a.x), resizeY(a.y), size, size);
  fill(100, 255, 0);
  ellipse(resizeX(b.x), resizeY(b.y), size, size);
  fill(0, 100, 255);
  ellipse(resizeX(c.x), resizeY(c.y), size, size);
  fill(255, 0, 100);
  ellipse(resizeX(d.x), resizeY(d.y), size, size);

  // noLoop();

  movePoints();
}

function reset() {
  thetaa = random(1000);
  thetab = random(1000);
  thetac = random(1000);
  thetad = random(1000);
}

function calculateLines() {
  l1s = [];
  l2s = [];
  l3s = [];
  l4s = [];
  fin = [];

  for (let x = -range; x < range; x += res) {
    const l1 =
      (a.y * (x - b.x) * (x - c.x) * (x - d.x)) /
      ((a.x - b.x) * (a.x - c.x) * (a.x - d.x));
    l1s.push(createVector(x, l1));
    const l2 =
      (b.y * (x - a.x) * (x - c.x) * (x - d.x)) /
      ((b.x - a.x) * (b.x - c.x) * (b.x - d.x));
    l2s.push(createVector(x, l2));
    const l3 =
      (c.y * (x - a.x) * (x - b.x) * (x - d.x)) /
      ((c.x - a.x) * (c.x - b.x) * (c.x - d.x));
    l3s.push(createVector(x, l3));
    const l4 =
      (d.y * (x - a.x) * (x - b.x) * (x - c.x)) /
      ((d.x - a.x) * (d.x - b.x) * (d.x - c.x));
    l4s.push(createVector(x, l4));

    fin.push(createVector(x, l1 + l2 + l3 + l4));
  }
}

// function mouseMoved() {
//   d.set(
//     map(mouseX, 0, width, -range, range),
//     map(mouseY, 0, height, -range, range)
//   );
// }

function movePoints() {
  const speed = 0.0014;
  thetaa += speed;
  thetab += speed;
  thetac += speed;
  thetad += speed;

  const r = range * 1.2;
  a.set(map(noise(thetaa), 0, 1, -r, r), map(noise(thetaa + 500), 0, 1, -r, r));
  b.set(map(noise(thetab), 0, 1, -r, r), map(noise(thetab + 500), 0, 1, -r, r));
  c.set(map(noise(thetac), 0, 1, -r, r), map(noise(thetac + 500), 0, 1, -r, r));
  d.set(map(noise(thetad), 0, 1, -r, r), map(noise(thetad + 500), 0, 1, -r, r));
}

function mouseClicked() {
  reset();
  // loop();
}

// let points;

// const range = 5;

// function setup() {
//   createCanvas(windowWidth - 20, windowHeight - 20);

//   reset();
// }

// function reset() {
//   points = [];
//   for (let i = 0; i < 3; i++) {
//     const point = createVector(random(-range, range), random(-range, range));
//     points.push(point);
//   }
// }

// function mouseClicked() {
//   reset();
// }

// function draw() {
//   background(0);

//   stroke(100);
//   strokeWeight(1);
//   noFill();

//   line(0, height / 2, width, height / 2);
//   line(width / 2, 0, width / 2, height);

//   noStroke();
//   fill(255, 0, 0);
//   points.forEach((point) => {
//     const x = resizeX(point.x);
//     const y = resizeY(point.y);
//     ellipse(x, y, 8, 8);
//   });

//   points.forEach((point) => {
//     const others = points.filter((p) => p != point);

//     for (let x = -range; x < range; x++) {
//       let y = 1;
//       let den = 1;
//       others.forEach((other) => {
//         y = y * (x - other.x);
//         den = den * (point.x - other.x);
//       });

//       y = y / den;

//       y = resizeY(y);
//       x = resizeX(x);

//       fill(255);
//       noStroke(0);

//       ellipse(x, y, 3, 3);

//       // (x-bx)(x-cx)(x-dx);
//     }
//   });
// }

function resizeX(x) {
  return map(x, -range, range, 0, width);
}
function resizeY(y) {
  return map(y, -range, range, 0, height);
}
