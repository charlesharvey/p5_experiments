class Pendulum {


    constructor(x, y, len, hue) {

        this.anchor = createVector(x, y);
        this.bob = createVector(x, y + len);

        this.gravity = 1.3;
        this.angle = PI / 6;
        this.angular_acc = 0;
        this.angular_vel = 0;
        this.len = len;
        this.r = 20;
        this.hue = hue;
    }



    update() {


        this.angular_acc = (-1 * this.gravity * sin(this.angle)) / this.len;


        this.angular_vel += this.angular_acc;
        this.angle += this.angular_vel;

        const x = sin(this.angle) * this.len + this.anchor.x;
        const y = cos(this.angle) * this.len + this.anchor.y;
        this.bob.set(x, y);

    }

    show() {

        stroke(50, 50);
        strokeWeight(1);
        noFill();
        line(this.anchor.x, this.anchor.y, this.bob.x, this.bob.y);

        fill(this.hue, 100, 100);
        ellipse(this.bob.x, this.bob.y, this.r, this.r);


    }
}