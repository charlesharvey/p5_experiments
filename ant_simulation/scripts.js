let ants, cols, rows, pheremones;
const MAX_SPEED = 3;
const NO_ANTS = 10;
const grid = 20;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  cols = floor(width / grid);
  rows = floor(height / grid);

  ants = [];
  for (let i = 0; i < NO_ANTS; i++) {
    ants.push(new Ant());
  }

  pheremones = [];
  for (let i = 0; i <= cols; i++) {
    pheremones[i] = [];
    for (let j = 0; j <= rows; j++) {
      pheremones[i][j] = 0;
    }
  }
}

function draw() {
  background(0);

  showPheremones();
  diffusePheremones();

  ants.forEach((ant) => {
    ant.vision();
    ant.update();
    ant.spew();
    ant.show();
  });
}

function showPheremones() {
  noStroke();
  pheremones.forEach((row, x) => {
    row.forEach((pheremone, y) => {
      const huee = min(255, pheremone);
      fill(huee);
      rect(x * grid, y * grid, grid, grid);
    });
  });
}

function diffusePheremones() {
  pheremones.forEach((row, x) => {
    row.forEach((pheremone, y) => {
      pheremones[x][y] *= 0.997;
    });
  });
}

class Ant {
  constructor() {
    const x = random(width);
    const y = random(height);
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(MAX_SPEED);
    this.acc = createVector(0, 0);
    this.fov = PI / 3;
    this.bestpost;
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, 3, 3);

    if (this.bestspot) {
      fill(255, 255, 0);
      ellipse(this.bestspot.x, this.bestspot.y, 5, 5);
    }
  }

  vision() {
    this.bestspot = null;
    let bestv,
      besta = -999;

    this.sightspots().forEach((vis) => {
      const x = gridX(vis.x);
      const y = gridY(vis.y);

      if (typeof pheremones[x] !== "undefined") {
        if (typeof pheremones[x][y] !== "undefined") {
          const am_pher = pheremones[x][y];

          if (am_pher > besta && am_pher > 0) {
            besta = am_pher;
            bestv = vis;
          }

          //   fill(255, 0, 0);
          //   ellipse(vis.x, vis.y, 3, 3);
        }
      }
    });

    if (bestv) {
      this.bestspot = bestv;
      //   const force = p5.Vector.sub(this.vel, bestv).normalize();
      //   this.applyForce(force);
    }
  }

  sightspots() {
    const j = this.vel.copy().normalize();
    const x1 = j.copy().mult(30);
    const x2 = j.copy().rotate(this.fov).mult(30);
    const x3 = j.copy().rotate(-this.fov).mult(30);

    const v1 = this.pos.copy().add(x1);
    const v2 = this.pos.copy().add(x2);
    const v3 = this.pos.copy().add(x3);

    return [v1, v2, v3];
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);

    this.vel.limit(MAX_SPEED);

    this.bounce();

    this.acc.mult(0);
  }

  bounce() {
    if (this.pos.x >= width) {
      this.vel.x *= -1;
      this.pos.x = width;
    }

    if (this.pos.x < 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
    }

    if (this.pos.y >= height) {
      this.vel.y *= -1;
      this.pos.y = height;
    }

    if (this.pos.y < 0) {
      this.vel.y *= -1;
      this.pos.y = 0;
    }
  }

  spew() {
    const x = gridX(this.pos.x);
    const y = gridY(this.pos.y);
    pheremones[x][y] += 10;
  }
}

function gridX(x) {
  return floor(x / grid);
}

function gridY(y) {
  return floor(y / grid);
}
