class Tank {
  constructor() {
    this.x = floor(random(width));
    this.y = floor(random(height));
    this.size = 30;
    this.color = color(random(255), random(255), random(255));
    this.speed = 5;
    this.direction = "UP";
    this.bullets = [];
    this.can_shoot = true;
  }

  move(DIRECTION) {
    this.direction = DIRECTION;

    if (DIRECTION === "UP") {
      this.y -= this.speed;
    } else if (DIRECTION === "DOWN") {
      this.y += this.speed;
    } else if (DIRECTION === "LEFT") {
      this.x -= this.speed;
    } else if (DIRECTION === "RIGHT") {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  show() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.size, this.size);

    this.bullets.forEach((bullet) => {
      if (bullet.update() == false) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        this.can_shoot = true;
        return;
      }
      bullet.show();
    });
  }
  shoot() {
    if (this.can_shoot) {
      let bullet = new Bullet(this);
      this.bullets.push(bullet);
      this.can_shoot = false;
    }
  }
}

class Bullet {
  constructor(tank) {
    this.tank = tank;
    this.x = tank.x + tank.size / 2;
    this.y = tank.y + tank.size / 2;
    this.size = 5;
    this.speed = 10;
    this.color = color(255, 0, 0);
    this.direction = tank.direction;
  }
  update() {
    if (this.direction === "UP") {
      this.y -= this.speed;
    } else if (this.direction === "DOWN") {
      this.y += this.speed;
    } else if (this.direction === "LEFT") {
      this.x -= this.speed;
    } else if (this.direction === "RIGHT") {
      this.x += this.speed;
    }

    if (this.y < 0 || this.y > height) {
      return false;
    } else if (this.x < 0 || this.x > width) {
      return false;
    }
  }
  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}
