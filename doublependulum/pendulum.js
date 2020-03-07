class Pendulum {


    constructor(x, y, length, mass) {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.size = Math.pow(this.mass, 0.5);
        this.length = length;
        this.angle = 0;
        this.child;
        this.color = random(255);
    }


    addChild() {
        this.child = new Pendulum(0, 0, 50, 100);
    }

    show() {
        stroke(this.color, 100, 100);
        noFill();
        push();
        translate(this.x, this.y);
        const endx = sin(this.angle) * this.length;
        const endy = cos(this.angle) * this.length;
        line(0, 0, endx, endy);

        fill(this.color, 100, 100);
        noStroke();
        ellipse(endx, endy, this.size, this.size);




        if (this.child) {
            this.child.x = endx;
            this.child.y = endy;
            this.child.angle -= 0.03;
            this.child.show();
            this.child.update();
        }

        pop();


    }

    update() {

        this.angle += 0.03;

    }
}