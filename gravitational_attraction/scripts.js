let particles;

const g = 5;
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  particles = [];

  for (let i = 0; i < 40; i++) {
    const x = random(width);
    const y = random(height);
    const p = new Particle(x, y);
    particles.push(p);
  }
}

function draw() {
  background(0);

  particles.forEach((p) => {
    particles.forEach((other) => {
      if (other !== p) {
        p.gravitate(other);
      }
    });
  });

  particles.forEach((p) => {
    p.update();
    p.show();
  });

  // noLoop();
}
