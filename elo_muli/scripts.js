class Player {
  constructor() {
    this.skill = Math.random();
    this.elo = 0.5;
  }
}

let players;
let offset, b, t, l, r, gr;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  reset();
}

function reset() {
  loop();
  players = [];

  for (let i = 0; i < 100; i++) {
    players.push(new Player());
  }

  offset = 100;
  b = height - offset;
  t = offset;
  l = offset;
  r = width - offset;
  gr = (r - l) / players.length;
}

function mousePressed() {
  reset();
}
function draw() {
  background(0);

  players.forEach((player, pi) => {
    const x = map(pi, 0, players.length, l, r);
    const h = map(player.skill, 0, 1, 0, b - t);

    fill(100);
    noStroke();
    rect(x, b - h, gr, h);
  });

  noFill();
  strokeWeight(1);
  stroke(255);
  line(l, b, r, b);
  noLoop();
}
