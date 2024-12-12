const USE_IMAGES = false;
const grid = 40;

let tiles = [
  { name: "a", id: 1, color: 0, buddies: [2] },
  { name: "b", id: 2, color: 100, buddies: [1] },
];

let options = [1, 2];

if (USE_IMAGES) {
  tiles = [
    { name: "a", id: 1, image: null, color: 0, buddies: [1, 3, 4, 5, 6] },
    { name: "b", id: 2, image: null, color: 50, buddies: [2, 3, 4, 5, 6] },
    { name: "c", id: 3, image: null, color: 100, buddies: [1, 2, 3, 4, 5, 6] },
    { name: "d", id: 4, image: null, color: 150, buddies: [1, 2, 3, 4, 5, 6] },
    { name: "e", id: 5, image: null, color: 200, buddies: [1, 2, 3, 4, 5, 6] },
    { name: "f", id: 6, image: null, color: 250, buddies: [1, 2, 3, 4, 5, 6] },
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
    const allowed = tiles.find((t) => t.id === this.options[0]).buddies;
    this.neighbours.forEach((other) => {
      if (allowed.includes(other.options[0])) {
      } else {
        allok = false;
      }
    });
    return allok;
  }

  setNeighbours() {
    this.neighbours = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // get cells top bottom left and right
        if (abs(i) + abs(j) == 1) {
          const other = cells.find(
            (c) => c.i === this.i + i && c.j === this.j + j
          );
          if (other) {
            this.neighbours.push(other);
          }
        }
      }
    }
  }

  collapse(recurse) {
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
            const t = tiles.find((tt) => tt.id == opt);
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

    // if (recurse) {
    //   next.forEach((next) => next.collapse(false));
    // }

    if (allneighbourscollapsed) {
      this.finished = true;
    }

    this.state = "collapsed";
  }

  show() {
    stroke(255);

    const ol = this.options.length;
    if (ol == 1) {
      const til = tiles.find((t) => t.id === this.options[0]);

      if (til) {
        if (this === current_cell) {
          strokeWeight(3);
        } else {
          strokeWeight(1);
        }

        if (til.image) {
          image(til.image, grid * this.i, grid * this.j, grid, grid);
        } else {
          const hu = til.color;
          fill(hu, 255, 255);
          rect(grid * this.i, grid * this.j, grid, grid);
        }
      }
    } else {
      const w = grid / ol;

      strokeWeight(1);

      this.options.forEach((opt, oi) => {
        const ww = grid / tiles.length;
        const xx = grid * this.i + ww * oi;
        const til = tiles.find((t) => t.id === opt);
        if (til.image) {
          image(til.image, xx, grid * this.j, ww, ww);
        } else {
          const hu = til.color;
          fill(hu, 255, 255);
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

  //   frameRate(2);
  getNewCurrentCell();
}

function getNewCurrentCell() {
  current_cell = getLowestEntropyCell();
  if (current_cell) {
    choices = [];
    current_cell.state = "pick_one";
  }
}

function draw() {
  background(0);
  cells.forEach((cell) => {
    cell.show();
  });

  if (choices.length === 0) {
  } else {
    getNewCurrentCell();
  }

  if (current_cell) {
    // console.log(current_cell.state, current_cell.i, current_cell.j);
    if (current_cell.state == "pick_one") {
      current_cell.pickRandomOption();
    } else if (current_cell.state == "collapse_me") {
      //   console.log(current_cell.options);
      current_cell.collapse(true);
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
    return choices.pop();
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
