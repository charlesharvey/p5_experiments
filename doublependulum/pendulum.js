class Pendulum {


    constructor(x, y, length, mass) {
        this.x = x;
        this.y = y;
        this.endx = x;
        this.endy = y;
        this.mass = mass;
        this.size = Math.pow(this.mass * 7, 0.5);
        this.length = length;
        this.angle = random(PI / 2, -PI / 2);
        this.child;
        this.color = random(255);
        this.vel = 0;
        this.acc = 0;

        this.history = [];
    }


    addChild() {
        if (!this.child) {
            const le = random(80, 200);
            const ma = random(10, 60);
            this.child = new Pendulum(0, 0, le, ma);
            this.child.color = (this.color + 40) % 255;
        }

    }

    show() {
        stroke(this.color, 200, 100);
        noFill();
        push();
        translate(this.x, this.y);
        this.endx = sin(this.angle) * this.length;
        this.endy = cos(this.angle) * this.length;
        line(0, 0, this.endx, this.endy);

        fill(this.color, 100, 100);
        noStroke();
        ellipse(this.endx, this.endy, this.size, this.size);




        if (this.child) {
            this.child.x = this.endx;
            this.child.y = this.endy;
            // this.child.angle -= 0.03;
            this.child.show();
            // this.child.update();
        }

        pop();


        fill(0, 0, 100, 50);
        noStroke();
        this.history.forEach(h => {
            ellipse(h[0], h[1], 2, 2);
        })


    }

    update() {

        const g = 1;
        const num1 = -g * (2 * this.mass + this.child.mass) * sin(this.angle);
        const num2 = this.child.mass * g * sin(this.angle - 2 * this.child.angle);
        const num3 = 2 * sin(this.angle - this.child.angle) * this.child.mass * (this.child.vel * this.child.vel * this.child.length + this.vel * this.vel * this.length * cos(this.angle - this.child.angle));


        const den1 = this.length * (2 * this.mass + this.child.mass - this.child.mass * cos(2 * this.angle - 2 * this.child.angle));




        const num4 = 2 * sin(this.angle - this.child.angle);
        const num5 = (this.vel * this.vel * this.length * (this.mass + this.child.mass));
        const num6 = g * (this.mass + this.child.mass) * cos(this.angle);
        const num7 = this.child.vel * this.child.vel * this.child.length * this.child.mass * cos(this.angle - this.child.angle);

        const den2 = this.child.length * (2 * this.mass + this.child.mass - this.child.mass * cos(2 * this.angle - 2 * this.child.angle));



        this.acc = (num1 - num2 - num3) / den1;
        this.child.acc = (num4 * (num5 + num6 + num7)) / den2;




        this.vel += this.acc;


        this.angle += this.vel;


        this.child.vel += this.child.acc;
        this.child.angle += this.child.vel;


        this.vel *= 0.9999;
        this.child.vel *= 0.9999;

        this.history.push([this.x + this.endx + this.child.endx, this.y + this.endy + this.child.endy]);


    }
}