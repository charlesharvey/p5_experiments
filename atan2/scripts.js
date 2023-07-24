const grid = 90;
let arrows;

const offset = 1.5707963267948966; // PI  / 2
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  arrows = [];
  for (let x = 0; x < width; x += grid) {
    for (let y = 0; y < height; y += grid) {
      arrows.push(new Arrow(x, y));
    }
  }
}

function draw() {
  background(0);

  arrows.forEach((arrow) => {
    arrow.setPhi();
    arrow.show();
  });

  // strokeWeight(grid / 15);
  // for (let x = 0; x < width; x += grid) {
  //   for (let y = 0; y < height; y += grid) {
  //     push();
  //     const phi = atan2(mouseX - x, y - mouseY) + PI / 2;
  //     translate(x, y);
  //     rotate(phi);
  //     stroke(255);
  //     line(-grid / 4, 0, grid / 4, 0);
  //     line(-grid / 4, 0, -grid / 7, -grid / 12);
  //     line(-grid / 4, 0, -grid / 7, grid / 12);
  //     pop();
  //   }
  // }
}

class Arrow {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.phi = 0;
    this.prev_phi = 0;
    this.rotations = 0;
    this.has_rotated = false;
  }

  setPhi() {
    // this.prev_phi = this.phi;

    let phi = atan2(mouseX - this.pos.x, this.pos.y - mouseY);

    // const diff = phi - this.phi;
    // if (!this.has_rotated) {
    //   this.has_rotated = true;
    //   if (diff > PI) {
    //     this.rotations++;
    //   } else if (diff < -PI) {
    //     this.rotations--;
    //   }
    // }

    let lp = 1;

    // if (abs(diff) > 3) {
    //   lp = 1;
    // }
    this.phi = lerp(this.phi, phi, lp);
  }

  show() {
    strokeWeight(grid / 15);
    stroke(255);

    push();

    translate(this.pos.x, this.pos.y);
    rotate(this.phi + offset);

    line(-grid / 4, 0, grid / 4, 0);
    line(-grid / 4, 0, -grid / 7, -grid / 12);
    line(-grid / 4, 0, -grid / 7, grid / 12);

    // rotate(-this.phi - offset);
    // noStroke();
    // fill(255);
    // text(`${round(this.phi * 10) / 10}  ${this.rotations} `, 20, 20);
    pop();
  }
}
