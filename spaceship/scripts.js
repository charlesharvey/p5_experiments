let obstacles;

let speed = 3;

function setup() {
  createCanvas(650, 650, WEBGL);
  rectMode(CENTER);

  obstacles = [];

  for (let i = 0; i < 20; i++) {
    const obstacle = new Obstacle();
    obstacles.push(obstacle);
  }
}

function mouseMoved() {
  //   obstacles.forEach((obstacle) => {
  //     obstacle.pos.x = map(mouseX, 0, width, -width / 2, width / 2);
  //     obstacle.pos.z = map(mouseY, 0, height, height / 2, -height / 2);
  //   });
}
function draw() {
  background(10, 30, 50);

  rotateX(1.2);

  noStroke();

  fill(255);
  rect(0, 0, width * 2, height * 2);

  obstacles.forEach((obstacle) => {
    obstacle.show();
    obstacle.move();
    obstacle.edges();
  });
}
