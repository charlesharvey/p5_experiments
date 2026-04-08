let tanks;

let my_tank;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  reset();
}

function reset() {
  tanks = [];
  for (let i = 0; i < 5; i++) {
    tanks.push(new Tank());
  }

  my_tank = new Tank();
  tanks.push(my_tank);
}

function draw() {
  background(0);

  tanks.forEach((tank) => {
    tank.show();
  });

  checkMoving();
}

function checkMoving() {
  if (keyIsDown(UP_ARROW)) {
    my_tank.move("UP");
  } else if (keyIsDown(DOWN_ARROW)) {
    my_tank.move("DOWN");
  } else if (keyIsDown(LEFT_ARROW)) {
    my_tank.move("LEFT");
  } else if (keyIsDown(RIGHT_ARROW)) {
    my_tank.move("RIGHT");
  }

  //space bar
  if (keyIsDown(32)) {
    my_tank.shoot();
  }
}
