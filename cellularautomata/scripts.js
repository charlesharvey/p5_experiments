let grid;
let rows, cols;
let generations;
let rules;
let ruleNumber;
let h;

const cool_rules = [
  150, 165, 237, 102, 78, 178, 109, 180, 182, 130, 134, 210, 105, 57, 30,
];

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB);
  // grid = 5;
  // rows = Math.ceil(height / grid);
  // cols = Math.ceil(width / grid);

  cols = 150;
  grid = Math.ceil(width / cols);
  rows = Math.ceil(height / grid / 2);
  reset();
}

function reset() {
  // ruleNumber = Math.floor(random(0, 255));
  ruleNumber = random(cool_rules);
  rules = makeRuleSetFromNumber(ruleNumber);
  h = 0;
  generations = [];

  let generation = makeGeneration();
  generation[Math.floor(cols / 2)] = 1;
  // if (Math.random() > 0.5) {
  //     generation = makeRandomGeneration();
  // }

  generations.push(generation);
}

function makeRuleSetFromNumber(n) {
  n = Math.floor(n);
  let r = [0, 0, 0, 0, 0, 0, 0, 0];
  const bins = [128, 64, 32, 16, 8, 4, 2, 1];
  bins.forEach((b, bi) => {
    if (n >= b) {
      r[bi] = 1;
      n = n - b;
    }
  });
  return r;
}

function mousePressed() {
  reset();
}

function makeGeneration() {
  const g = [];
  for (let i = 0; i < cols; i++) {
    g[i] = 0;
  }
  return g;
}
function makeRandomGeneration() {
  const g = [];
  for (let i = 0; i < cols; i++) {
    g[i] = Math.round(Math.random());
  }
  return g;
}

function applyRule(a, b, c) {
  const ind = a * 4 + b * 2 + c;

  // console.log(a, b, c);
  return rules[ind];
}

function draw() {
  background(0);

  noStroke();

  h += 0.005;

  generations.forEach((generation, i) => {
    const y = i * grid;
    generation.forEach((cell, j) => {
      const x = j * grid;

      h += 0.00007;

      fill(h % 255, 255, cell * 255);
      rect(x, y, grid, grid);
    });
  });

  let new_generation = makeGeneration();
  for (let i = 0; i < generations[0].length; i++) {
    const ai = (i - 1 + generations[0].length) % generations[0].length;
    const bi = 1;
    const ci = (i + 1 + generations[0].length) % generations[0].length;

    // console.log(ai, bi, ci);

    const a = generations[0][ai];
    const b = generations[0][bi];
    const c = generations[0][ci];
    const newval = applyRule(a, b, c);
    new_generation[i] = newval;
  }

  generations.unshift(new_generation);

  if (generations.length > rows) {
    generations.pop();
  }

  // noLoop();

  // frameRate(30);

  fill(100, 0, 200);
  text(`Rule Number: ${ruleNumber}`, 20, height - 40);
  text(`Click to change rule`, 20, height - 20);
}
