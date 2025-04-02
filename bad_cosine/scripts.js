function badCos(x) {
  x = x % TWO_PI;
  //   let terms = 10;
  // TAYLOR SERIES
  let s = 1;

  for (let i = 0; i < terms; i++) {
    const c = (i + 1) * 2;
    const g = Math.pow(x, c) / fact(c);

    if (i % 2 == 0) {
      s -= g;
    } else {
      s += g;
    }
  }
  return s;
}

// https://web.archive.org/web/20210513043002/http://web.eecs.utk.edu/~azh/blog/cosine.html

// function fact(n) {
//   return n < 2 ? 1 : fact(n - 1) * n;
// }

function fact(n) {
  if (n == 1) {
    return 1;
  } else if (n == 2) {
    return 2;
  } else if (n == 4) {
    return 24;
  } else if (n == 6) {
    return 720;
  } else if (n == 8) {
    return 40320;
  } else if (n == 10) {
    return 3628800;
  } else if (n == 12) {
    return 479001600;
  } else if (n == 14) {
    return 87178291200;
  } else if (n == 16) {
    return 20922789888000;
  } else if (n == 18) {
    return 6402373705728000;
  } else if (n == 20) {
    return 2432902008176640000;
  }
}

let t = 0;
let terms;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  terms = 1;
}

function mouseMoved() {
  terms = floor(map(mouseX, 0, width, 1, 10));
}

function draw() {
  background(0);

  noStroke();
  for (let x = 0; x < width; x++) {
    const j = x / 100 - 40;

    const goody = map(cos(j + t), -2, 2, 0 + 50, height - 50);
    fill(0, 255, 0);
    ellipse(x, goody, 5);

    const y = map(badCos(j + t), -2, 2, 0 + 50, height - 50);
    fill(255);
    ellipse(x, y, 5);
  }

  t += 0.01;

  text(`TAYLOR SERIES OF COS. terms: ${terms}`, 20, 20);

  stroke(255);
  noFill();
  line(0, height / 2, width, height / 2);
}
