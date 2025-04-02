let robotarms;
const segLen = 15;
const numSegs = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);

  robotarms = [];

  for (let i = 0; i < 30; i++) {
    const arm = new RobotArm(width / 2, height, numSegs, segLen, 0);
    robotarms.push(arm);
  }
}

function draw() {
  background(51);

  robotarms.forEach((arm, i) => {
    arm.wind();
    arm.update();
    arm.show();
  });
}
