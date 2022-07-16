let particles = [];

let demon;

let counts;

const NUMBER_PARTICLES = 100;

class Demon {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.height = 100;

    this.topy = this.y - this.height / 2;
    this.bottomy = this.y + this.height / 2;
    this.show_door = false;
  }

  detect(ps) {
    this.show_door = false;
    ps.forEach((p) => {
      const dx = Math.abs(p.pos.x - this.x);

      //   stroke(255, 30);
      //   strokeWeight(1);
      //   line(p.pos.x, p.pos.y, this.x, this.topy);
      //   line(p.pos.x, p.pos.y, this.x, this.bottomy);

      // it is in line with the divider

      if (dx < p.vel.mag()) {
        let should_bounce = true;

        // it is passing through the gate
        if (p.pos.y > this.topy && p.pos.y < this.bottomy) {
          if (p.vel.x > 0 && p.temp == "hot") {
            should_bounce = false;
            this.show_door = true;
          } else if (p.vel.x < 0 && p.temp == "cold") {
            should_bounce = false;
            this.show_door = true;
          }
        }

        if (should_bounce) {
          p.bounceX();
        }
      }
    });
  }

  show() {
    stroke(255);
    noFill();
    strokeWeight(3);
    line(this.x, 0, this.x, height);

    if (this.show_door) {
      stroke(255);
    } else {
      stroke(255, 140);
    }
    rect(this.x, this.y, 10, this.height);
  }
}
class Particle {
  constructor(x, y, temp) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.temp = temp;
    this.r = 8;

    if (temp == "hot") {
      this.vel.mult(random(5, 10));
    } else {
      this.vel.mult(random(2, 4));
    }
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.bounceX();
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.bounceY();
    }
  }

  bounceX() {
    this.vel.x *= -1;
  }
  bounceY() {
    this.vel.y *= -1;
  }

  count(counts) {
    if (this.temp == "cold") {
      if (this.pos.x < width / 2) {
        counts.cold_left++;
      } else {
        counts.cold_right++;
      }
    } else {
      if (this.pos.x < width / 2) {
        counts.hot_left++;
      } else {
        counts.hot_right++;
      }
    }
  }

  show() {
    noStroke();

    if (this.temp == "cold") {
      fill(0, 10, 255);
    } else {
      fill(255, 10, 0);
    }
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  rectMode(CENTER);
  for (let i = 0; i < NUMBER_PARTICLES; i++) {
    particles.push(new Particle(random(width), random(height), "hot"));
    particles.push(new Particle(random(width), random(height), "cold"));
  }

  demon = new Demon();

  resetCounts();
}

function resetCounts() {
  counts = {
    cold_left: 0,
    cold_right: 0,
    hot_left: 0,
    hot_right: 0,
  };
}

function draw() {
  background(0);
  resetCounts();

  particles.forEach((p) => {
    p.update();
    p.show();
    p.count(counts);
  });

  demon.detect(particles);
  demon.show();

  noStroke();

  textSize(20);
  fill(0, 0, 255);
  text(counts.cold_left, width / 2 - 40, 25);
  text(counts.cold_right, width / 2 + 20, 25);

  fill(255, 0, 0);
  text(counts.hot_left, width / 2 - 40, 50);
  text(counts.hot_right, width / 2 + 20, 50);
}
