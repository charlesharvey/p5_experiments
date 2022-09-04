const grid = 15;

let rows, cols;

let nodes;
let unfilled;

let prob;
let theta = 0; //-3.14 / 2;

let current_node;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 255, 255, 255);
  cols = floor(height / grid);
  rows = floor(width / grid);

  nodes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const node = new Node(r, c);
      nodes.push(node);
    }
  }

  reset();
}

function reset() {
  prob = map(sin(theta), -1, 1, 0, 1);

  nodes.forEach((node) => {
    node.reset();
  });

  setUnfilled();
  while (unfilled.length > 0) {
    current_node = random(unfilled);
    current_node.flood();
    setUnfilled();
  }

  theta += 0.1;
}

function setUnfilled() {
  unfilled = nodes.filter((n) => n.filled === false);
}

function draw() {
  background(0);

  nodes.forEach((node) => {
    node.show();
  });

  noStroke();
  fill(255);
  text(`p = ${Math.round(prob * 1000) / 1000}`, 15, height - 5);

  //   noLoop();
  //   frameRate(2);
  reset();
}
