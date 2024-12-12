const USE_IMAGES = window.location.hostname.includes("charles");
const grid = 50;
const SLOW = false;

let tiles = [
  { id: 1, hu: 0, buddies: [1, 2, 3, 4], n: [2], s: [2], e: [3], w: [3] },
  { id: 2, hu: 100, buddies: [1], n: [1], s: [1], e: [2], w: [2] },
  { id: 3, hu: 200, buddies: [1], n: [3], s: [3], e: [1], w: [1] },
  { id: 4, hu: 300, buddies: [1, 4], n: [3], s: [3], e: [1], w: [1] },
];

let options = [1, 2, 3, 4];

const checks = [
  ["n", "s"],
  ["s", "n"],
  ["w", "e"],
  ["e", "w"],
];

if (USE_IMAGES) {
  tiles = [
    { name: "a", id: 1, image: null, hu: 0, buddies: [1, 3, 4, 5, 6] },
    { name: "b", id: 2, image: null, hu: 50, buddies: [2, 3, 4, 5, 6] },
    { name: "c", id: 3, image: null, hu: 100, buddies: [1, 2, 3, 4, 5, 6] },
    { name: "d", id: 4, image: null, hu: 150, buddies: [1, 2, 3, 4, 5, 6] },
    { name: "e", id: 5, image: null, hu: 200, buddies: [1, 2, 3, 4, 5, 6] },
    { name: "f", id: 6, image: null, hu: 250, buddies: [1, 2, 3, 4, 5, 6] },
  ];
  options = [1, 2, 3, 4, 5, 6];
}

let rows, cols;
let cells;
let current_cell;
let choices = [];

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.options = options;
    this.state = "started";
    this.neighbours = [];
    this.finished = false;
  }

  pickRandomOption() {
    this.options = [random(this.options)];
    this.state = "collapse_me";
    choices = [];
  }

  allNeighboursOK() {
    let allok = true;
    const til = tile(this.options[0]);
    if (til) {
      const allowed = til.buddies;
      this.neighbours.forEach((other) => {
        if (allowed.includes(other.options[0])) {
        } else {
          allok = false;
        }
      });
    } else {
      allok = false;
    }
    return allok;
  }

  setNeighbours() {
    this.s = cells.find((c) => c.i + 1 == this.i && c.j == this.j);
    this.n = cells.find((c) => c.i - 1 == this.i && c.j == this.j);
    this.w = cells.find((c) => c.i == this.i && c.j - 1 == this.j);
    this.e = cells.find((c) => c.i == this.i && c.j + 1 == this.j);

    this.neighbours = [this.s, this.n, this.w, this.e].filter(
      (n) => n != undefined
    );
    // for (let i = -1; i <= 1; i++) {
    //   for (let j = -1; j <= 1; j++) {
    //     // get cells top bottom left and right
    //     if (abs(i) + abs(j) == 1) {
    //       const other = cells.find(
    //         (c) => c.i === this.i + i && c.j === this.j + j
    //       );
    //       if (other) {
    //         this.neighbours.push(other);
    //       }
    //     }
    //   }
    // }
  }

  // 123 , 123 , 123
  // 123 , 1   , 123
  // 123 , 123 , 123

  checkNeighbours() {
    let notpos = [];

    this.options.forEach((opt) => {
      checks.forEach((check) => {
        const [q, r] = check;
        if (this[q]) {
          this[q].options.forEach((nopt) => {
            const vs = tile(nopt)[r];
            if (!vs.includes(opt)) {
              notpos.push(opt);
            }
          });
        }
      });
    });
    console.log(notpos);
  }

  collapse() {
    let allneighbourscollapsed = true;
    let next = [];

    this.neighbours.forEach((other) => {
      if (other.options.length > 1) {
        if (other) {
          next.push(other);

          if (!choices.includes(other)) {
            choices.push(other);
          }
          allneighbourscollapsed = false;
          let poss = [];
          this.options.forEach((opt) => {
            const t = tile(opt);
            if (t) {
              t.buddies.forEach((bud) => {
                if (other.options.includes(bud)) {
                  if (!poss.includes(bud)) {
                    poss.push(bud);
                  }
                }
              });
            }
          });
          other.options = poss;
        }
      }
    });

    if (allneighbourscollapsed) {
      this.finished = true;
    }

    this.state = "collapsed";
  }

  show() {
    stroke(255);

    const ol = this.options.length;
    if (ol == 1) {
      const til = tile(this.options[0]);

      if (til) {
        if (this === current_cell) {
          strokeWeight(3);
        } else {
          strokeWeight(1);
        }

        if (til.image) {
          image(til.image, grid * this.i, grid * this.j, grid, grid);
        } else {
          fill(til.hu, 255, 255);
          rect(grid * this.i, grid * this.j, grid, grid);
        }
      }
    } else {
      const w = grid / ol;

      strokeWeight(1);

      this.options.forEach((opt, oi) => {
        const ww = grid / tiles.length;
        const xx = grid * this.i + ww * oi;
        const til = tile(opt);
        if (til.image) {
          image(til.image, xx, grid * this.j, ww, ww);
        } else {
          fill(til.hu, 255, 255);
          rect(xx, grid * this.j, ww, ww);
        }
      });
    }
  }
}

function preload() {
  if (USE_IMAGES) {
    tiles[0].image = loadImage("1.png");
    tiles[1].image = loadImage("2.png");
    tiles[2].image = loadImage("3.png");
    tiles[3].image = loadImage("4.png");
    tiles[4].image = loadImage("5.png");
    tiles[5].image = loadImage("6.png");
  }
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB);
  rows = Math.floor(height / grid);
  cols = Math.floor(width / grid);

  cells = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cell = new Cell(i, j);
      cells.push(cell);
    }
  }

  cells.forEach((cell) => cell.setNeighbours());

  if (SLOW) {
    frameRate(2);
  }
  getNewCurrentCell();
}

function getNewCurrentCell() {
  current_cell = getLowestEntropyCell();
  if (current_cell) {
    choices = [];
    current_cell.state = "pick_one";
  }
}

function tile(id) {
  return tiles.find((t) => t.id === id);
}

function draw() {
  background(0);
  cells.forEach((cell) => {
    cell.show();
  });

  if (choices.length === 0) {
    // getNewCurrentCell();
  } else {
  }

  if (current_cell) {
    if (current_cell.state == "pick_one") {
      current_cell.pickRandomOption();
    } else if (current_cell.state == "collapse_me") {
      current_cell.collapse();
    } else if (current_cell.state == "collapsed") {
      getNewCurrentCell();
    }
  } else {
    console.log("finished");
    noLoop();
    checkAllCells();
  }
}

function checkAllCells() {
  let allcellsok = true;
  cells.forEach((cell) => {
    cell_ok = cell.allNeighboursOK();
    if (!cell_ok) {
      allcellsok = false;
    }
  });
  console.log("allcellsok", allcellsok);
}

function getLowestEntropyCell() {
  if (choices.length > 0) {
    const a = random(choices);
    choices = choices.filter((c) => c != a);
    return a;
  } else {
    // const wc =
    //   choices.length > 0
    //     ? choices
    //     : cells.filter((c) => c.state !== "collapsed" && !c.finished);

    //   console.log("cl", choices.length);

    const wc = cells.filter((c) => c.state !== "collapsed" && !c.finished);

    let record_cells = [];
    let record_length = Number.POSITIVE_INFINITY;
    wc.forEach((cell) => {
      // if (cell.options.length > 1) {
      if (cell.options.length < record_length) {
        record_length = cell.options.length;
        record_cells = [cell];
      } else if (cell.options.length == record_length) {
        record_cells.push(cell);
      }
      // }
    });

    let record_cell = random(record_cells);

    return record_cell;
  }
}
