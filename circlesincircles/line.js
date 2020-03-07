class Line {

    constructor(theta) {
        this.theta = theta;
        this.zeta = 0;
        this.length = 150;
    }


    show() {

        const dt = this.theta; // * ( sin(this.zeta));

        push();
        rotate(dt);

        stroke(0, 50);
        strokeWeight(1);
        noFill();
        line(0, this.length * -1, 0, this.length);

        fill(255, 0, 0);
        noStroke();
        let bloby = map(sin(dt), -1, 1, this.length * -1, this.length);
        ellipse(0, bloby, 7, 7);

        pop();



    }

    update(speed) {
        this.theta += speed;
    }


    changeTheta(zeta) {
        this.zeta = zeta;
    }
}