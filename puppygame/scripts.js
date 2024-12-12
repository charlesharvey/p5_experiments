let puppy;
let green;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  rectMode(CENTER);
  colorMode(HSB);

  green = color(100, 100, 90);

  puppy = new Puppy(width / 2, height / 2);
}

function keyReleased() {
  if (key == "ArrowUp") {
  }
}

function keyPressed() {
  if (key == "ArrowRight") {
    puppy.move("right");
  } else if (key == "ArrowLeft") {
    puppy.move("left");
  } else if (key == "ArrowUp") {
    puppy.move("up");
  } else if (key == "ArrowDown") {
    puppy.move("down");
  } else if (keyCode == 32) {
    // spacebar
    puppy.jump();
  }
}

function draw() {
  background(green);

  puppy.update();
  puppy.show();
}
