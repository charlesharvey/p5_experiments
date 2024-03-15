const cols = 7;
const rows = 6;

const RED = 0;
const YELLOW = 60;
const WIN_LENGTH = 4;
const DISC_SIZE = 0.8;

const USE_AI = location.search.includes("ai");

let grid;
let mx, my;
let discs;
let testdiscs;
let player;
let currentColor;
let winnerColor;
let winLine;
let animating;
let gameOver;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB);
  let ww = width / (cols + 2);
  let wh = height / (rows + 2);
  grid = floor(min(ww, wh));

  reset();
}

function mouseMoved() {
  mx = mouseX;
  my = mouseY;
}

function keyPressed() {
  if (keyCode === 82) {
    reset();
  }
}

function reset() {
  loop();
  discs = [];
  // fakeData();

  testdiscs = [];
  player = 0;
  gameOver = false;
  animating = false;
  setCurrentColor();
}

function fakeData() {
  const d1 = new Disc(0, rows - 1, RED);
  const d2 = new Disc(1, rows - 1, YELLOW);
  const d3 = new Disc(0, rows - 2, RED);
  const d4 = new Disc(1, rows - 2, YELLOW);
  const d5 = new Disc(0, rows - 3, RED);
  const d6 = new Disc(1, rows - 3, YELLOW);
  discs = [d1, d2, d3, d4, d5, d6];
}

function mousePressed() {
  if (!gameOver && !animating) {
    const c = closest(mx, my);

    if (!occupied(c.x, c.y)) {
      if (!columnFullyOccupied(c.x)) {
        makeMove(c.x, c.y);

        if (USE_AI) {
          if (player == 1) {
            makeAIMove();
          }
        }
      }
    }
  }
}

function makeMove(x, y) {
  const lowestRow = lowestRowFree(x, y);
  const disc = new Disc(x, lowestRow, currentColor);
  discs.push(disc);
  animating = true;
  player = player == 1 ? 0 : 1;
  checkWins();
  setCurrentColor();
}

function makeTestMove(x, y) {
  testdiscs = [...discs];
  const lowestRow = lowestRowFree(x, y);
  const disc = new Disc(x, lowestRow, currentColor);
  testdiscs.push(disc);
  const ctw = checkTestWins();
  return ctw;
}

function makeAIMove() {
  if (!animating && !gameOver) {
    let shouldmakemove = true;
    while (shouldmakemove) {
      allowedmoves = [];
      for (let k = 0; k < cols; k++) {
        const cfo = columnFullyOccupied(k);
        if (!cfo) {
          shouldmakemove = false;
          let movewins = makeTestMove(k, 0);

          if (movewins) {
            allowedmoves = [k];
            k = Infinity;
          } else {
            allowedmoves.push(k);
          }
        }
      }

      const rx = random(allowedmoves);
      // const b = closest(rx * grid, 0);
      const cfo = columnFullyOccupied(rx);
      if (!cfo) {
        shouldmakemove = false;
        makeMove(rx, 0);
      }
    }
  } else {
    setTimeout(makeAIMove, 500);
  }
}

function checkTestWins() {
  let w = false;
  testdiscs.forEach((disc) => {
    if (disc.wins({ test: true })) {
      w = true;
    }
  });
  return w;
}

function checkWins() {
  winLine = null;

  if (!gameOver) {
    discs.forEach((disc) => {
      let w = disc.wins({ test: false });
      if (w) {
        gameOver = true;
        winnerColor = w[0].color;

        setTimeout(() => {
          winLine = w;
        }, 500);
      }
    });
  }

  // for (let x = 0; x < cols; x++) {
  //   if (!gameOver) {
  //     let w = verticalWin(x);
  //     if (w) {
  //       winLine = w;
  //       gameOver = true;
  //     }
  //   }
  // }
  // for (let y = 0; y < rows; y++) {
  //   if (!gameOver) {
  //     let w = horizontalWin(y);
  //     if (w) {
  //       winLine = w;
  //       gameOver = true;
  //     }
  //   }
  // }

  // if (winLine) {
  //   winnerColor = winLine[0].color;
  // }
}

function setCurrentColor() {
  if (player == 0) {
    currentColor = RED;
  } else {
    currentColor = YELLOW;
  }
}

function draw() {
  background(0);

  stroke(0, 0, 50);
  strokeWeight(1);
  noFill();

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const d = dp(x, y);
      ellipse(d.x, d.y, grid, grid);
    }
  }

  rect(grid / 2 - 10, grid / 2 - 10, cols * grid + 20, rows * grid + 20);
  rect(grid / 2 - 15, grid / 2 - 15, cols * grid + 30, rows * grid + 30);

  discs.forEach((disc) => {
    disc.update();
    disc.show();
  });

  if (!gameOver) {
    fill(currentColor, 80, 80);
    noStroke();
    const cl = closest(mx, 0);
    const dd = dp(cl.x, cl.y);
    ellipse(dd.x, dd.y - grid / 2, grid * DISC_SIZE, grid * DISC_SIZE);
  }

  // fill(0, 0, 100);
  // noStroke();
  // if (gameOver) {
  //   text(`Winner `, 40, 20);
  //   fill(winnerColor, 100, 100);
  // } else {
  //   text(`Current Player`, 40, 20);
  //   fill(currentColor, 100, 100);
  // }
  // ellipse(20, 15, 15, 15);

  if (winLine) {
    const f = winLine[0];
    const l = winLine[winLine.length - 1];
    const d1 = dp(f.x, f.y);
    const d2 = dp(l.x, l.y);
    stroke(100, 70, 80);
    strokeWeight(9);
    noFill();
    line(d1.x, d1.y, d2.x, d2.y);

    noLoop();
  }
}

function closest(x, y) {
  const xx = min(cols - 1, max(0, round((x - grid) / grid)));
  const yy = min(rows - 1, max(0, round((y - grid) / grid)));
  return { x: xx, y: yy };
}

function occupied(x, y, opts = null) {
  let others = discs;
  if (opts) {
    if (opts.test) {
      others = testdiscs;
    }
  }

  const other = others.find((d) => d.x === x && d.y === y);
  if (other) {
    return other;
  }
  return false;
}

function columnFullyOccupied(x) {
  const other_length = discs.filter((d) => d.x === x).length;
  return other_length == rows;
}

function lowestRowFree(x, y) {
  let lowest = 0;
  for (let i = y; i < rows; i++) {
    const oc = occupied(x, i);
    if (!oc) {
      lowest = i;
    } else {
      i = Infinity;
    }
  }
  return lowest;
}

function dp(x, y) {
  return { x: (x + 1) * grid, y: (y + 1) * grid };
}

// function verticalWin(x) {
//   let run = 1;
//   let currentColor = Infinity;
//   let pos = [];
//   let currentY = Infinity;

//   for (let py = 0; py < cols; py++) {
//     const oc = occupied(x, py);
//     if (oc) {
//       if (oc.color === currentColor) {
//         run++;
//         pos.push(oc);
//       } else {
//         pos = [oc];
//         run = 1;
//       }

//       currentColor = oc.color;
//       currentY = oc.y;
//       if (run >= WIN_LENGTH) {
//         return pos;
//       }
//     } else {
//       run = 1;
//       pos = [];
//     }
//   }

//   return false;
// }

// function horizontalWin(y) {
//   let run = 1;
//   let currentColor = Infinity;
//   let pos = [];
//   let currentX = Infinity;

//   for (let px = 0; px < cols; px++) {
//     const oc = occupied(px, y);
//     if (oc) {
//       if (oc.color === currentColor) {
//         run++;
//         pos.push(oc);
//       } else {
//         pos = [oc];
//         run = 1;
//       }

//       currentColor = oc.color;
//       currentX = oc.x;
//       if (run >= WIN_LENGTH) {
//         return pos;
//       }
//     } else {
//       run = 1;
//       pos = [];
//     }
//   }

//   return false;
// }

class Disc {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.age = 0;
    this.animating = true;
  }

  update() {
    if (this.animating) {
      if (this.age < 100) {
        this.age += 5;
      } else {
        this.animating = false;
        animating = false;
      }
    }
  }

  show() {
    noStroke();
    fill(this.color, 100, 100);

    const d = dp(this.x, this.y);
    const lerpy = lerp(0, d.y, this.age / 100);
    ellipse(d.x, lerpy, grid * DISC_SIZE, grid * DISC_SIZE);
  }

  wins(opts) {
    let pospos = [this];
    let posneg = [this];
    let poshor = [this];
    let posver = [this];
    let currentPosColor = this.color;
    let currentNegColor = this.color;
    let currentHorColor = this.color;
    let currentVerColor = this.color;

    for (let mm = 1; mm < WIN_LENGTH; mm++) {
      let posoc = occupied(this.x + mm, this.y - mm, opts);
      let negoc = occupied(this.x + mm, this.y + mm, opts);
      let horoc = occupied(this.x + mm, this.y, opts);
      let veroc = occupied(this.x, this.y - mm, opts);

      if (posoc) {
        if (posoc.color === currentPosColor) {
          pospos.push(posoc);
          if (pospos.length >= WIN_LENGTH) {
            return pospos;
          }
        } else {
          //
        }
        currentPosColor = posoc.color;
      } else {
        //
      }

      if (negoc) {
        if (negoc.color === currentNegColor) {
          posneg.push(negoc);
          if (posneg.length >= WIN_LENGTH) {
            return posneg;
          }
        } else {
          //
        }
        currentNegColor = negoc.color;
      } else {
        //
      }
      if (horoc) {
        if (horoc.color === currentHorColor) {
          poshor.push(horoc);
          if (poshor.length >= WIN_LENGTH) {
            return poshor;
          }
        } else {
          //
        }
        currentHorColor = horoc.color;
      } else {
        //
      }

      if (veroc) {
        if (veroc.color === currentVerColor) {
          posver.push(veroc);
          if (posver.length >= WIN_LENGTH) {
            return posver;
          }
        } else {
          //
        }
        currentVerColor = veroc.color;
      } else {
        //
      }
    }
    return false;
  }
}
