class Charles {
  constructor(image) {
    const x = random(width);
    const y = random(-200, -100);
    const speed = random(1, 6);
    this.pos = createVector(x, y);
    this.vel = createVector(0, speed);
    this.acc = createVector(0, 0);
    this.image = image;

    this.width = random(30, 110);
    this.height = this.width * (147 / 100);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(13);
    this.acc.mult(0); // createVector(0, 0);
  }

  attracted(target, repelDistance) {
    const force = p5.Vector.sub(target, this.pos);
    let dir2 = force.magSq(); // square the distance between the target and current position;
    dir2 = constrain(dir2, 0, 1000);
    const g = 3.987;
    const strength = g / dir2;
    force.setMag(strength);

    const d = dist(target.x, target.y, this.pos.x, this.pos.y);
    if (d < repelDistance) {
      force.mult(-100);
    } else {
      force.mult(6);
    }

    this.applyForce(force);
    // this.acc = force.copy();
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);

    if (useImage) {
      image(this.image, 0, 0, this.width, this.height);
    } else {
      fill(255);
      noStroke();
      rect(0, 0, this.width, this.height);
    }

    pop();
  }

  offscreen() {
    return (
      this.pos.y > height ||
      this.pos.x > width + this.width ||
      this.pos.x < 0 - this.width
    );
  }
}

let useImage = true;
let target;
let charleses;
let charlesimage;
let dahlia1image, dahlia2image, lilyimage, sunflowerimage;
let numberofcharleses;
let colorangle = 0;
function preload() {
  if (useImage) {
    charlesimage = loadImage("charles1.png");
    dahlia1image = loadImage("dahlia_1.png");
    dahlia2image = loadImage("dahlia_2.png");
    lilyimage = loadImage("lily.png");
    sunflowerimage = loadImage("sunflower.png");
  }
}

function createCharles() {
  const random_image = random([
    charlesimage,
    dahlia1image,
    dahlia2image,
    lilyimage,
    sunflowerimage,
  ]);

  charleses.push(new Charles(random_image));
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  reset();
}
function mouseMoved() {
  target.x = mouseX;
  target.y = mouseY;
}

function mouseClicked() {
  reset();
}

function reset() {
  target = createVector(width / 2, height / 2);
  charleses = [];
  numberofcharleses = Math.floor(width / 20);
  for (let i = 0; i < numberofcharleses; i++) {
    createCharles();
  }
}

function draw() {
  colorMode(HSB);
  const b = map(sin(colorangle), -1, 1, 0, 255);
  background(b, 120, 60);

  // image(charlesimage, 0, 0, width, height);

  // background(0, 200);

  charleses.forEach((f, i) => {
    f.show();
    f.attracted(target, width / 9);

    f.update();
    if (f.offscreen()) {
      charleses.splice(i, 1);
    }
  });

  if (charleses.length < numberofcharleses) {
    createCharles();
  }

  // if (frameRate() > 30) {
  //     createCharles();
  // }

  textAlign(CENTER);

  noStroke();
  const text1start = 10;
  const text2start = 50;
  const texttime = 100;
  if (frameCount > text1start) {
    textSize(40);
    const f1 = map(frameCount, text1start, text1start + texttime, 0, 255);
    colorMode(RGB);
    fill(255, f1);
    text("HAPPY BIRTHDAY MUM", width / 2, height / 2);
  }
  if (frameCount > text2start) {
    textSize(25);
    const f1 = map(frameCount, text2start, text2start + texttime, 0, 255);
    fill(255, 255, 255, f1);
    text("LOVE CHARLES", width / 2, height / 2 + 50);
  }

  colorangle += 0.005;
}
