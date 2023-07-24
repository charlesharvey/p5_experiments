const grid = 8;

let start_time = performance.now();
let end_time;

let rows, cols;

let nodes;
let unfilled;

let prob;
let theta = 0; //-3.14 / 2;

let current_node;

let show_animation = true;
let maxDepth = 0;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 255, 255, 255);
  cols = floor(width / grid);
  rows = floor(height / grid);

  nodes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const node = new Node(r, c);
      nodes.push(node);
    }
  }
  // reset();

  reset();
}

function animatePercolation() {
  if (!current_node) {
    maxDepth = 0;
    setUnfilled();
    current_node = random(unfilled);
    if (current_node) {
      current_node.flood({ depth: 0 });
      current_node = null;
    } else {
      reset();
    }
  }
}

function reset() {
  prob = map(sin(theta), -1, 1, 0, 1);

  nodes.forEach((node) => {
    node.reset();
  });

  if (!show_animation) {
    setUnfilled();
    while (unfilled.length > 0) {
      current_node = random(unfilled);
      current_node.flood();
      setUnfilled();
    }
  }

  theta += 0.1;
}

function setUnfilled() {
  unfilled = nodes.filter((n) => n.filled === false);
}

function draw() {
  background(0);

  if (show_animation) {
    animatePercolation();
    maxDepth++;
  }

  nodes.forEach((node) => {
    node.show();
  });

  noStroke();
  fill(255);
  text(`p = ${Math.round(prob * 1000) / 1000}`, 15, height - 5);

  // end_time = performance.now();
  // console.log(end_time - start_time);

  // noLoop();
  //

  if (show_animation) {
  } else {
    reset();
  }
}
