class Wave {

    constructor(x, y, size, theta) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.theta = theta;
        this.dx = x;
        this.dy = y;
    }


    show() {
        noStroke();
        fill(255);
        ellipse(this.dx, this.dy, 5, 5);

        stroke(255, 100);
        strokeWeight(1);
        noFill();
        ellipse(this.x, this.y, this.size, this.size);


    }

    update() {
        this.theta -= 0.04;
        this.dx = (sin(this.theta) * (this.size / 2)) + this.x;
        this.dy = (cos(this.theta) * (this.size / 2)) + this.y;
    }
}