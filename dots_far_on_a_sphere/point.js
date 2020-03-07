class Point {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = p5.Vector.random2D();


        this.angle = random(0, TWO_PI);
        this.pos.rotate(this.angle);


        //

        // this.x;
        // this.y;
        this.distance;
        this.prev_distance;
    }



    show() {
        fill(255, 0, 0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }


    calculatePosition() {

        // this.x = sin(this.angle) * radius;
        // this.y = cos(this.angle) * radius;

        // this.distance = dist(0, 0, this.pos.x, this.pos.y);

    }

    calculateDirection(others) {
        // let start = this.pos.copy();
        // others.forEach(other => {
        //     if (other != this) {
        //         start = start.mult(other)
        //     }
        // });
        // start.setMag(1);
        // this.vel = start;
    }



    addForce(force) {
        this.acc.add(force);
    }

    update() {

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.setMag(1);


        // this.pos.add(this.vel);
        // // this.angle += 0.001;

        // // this.pos.limit(radius);
        // // this.pos.setMag(radius);
        // // console.log();
        // if (this.pos.mag() > radius) {
        //     this.pos.setMag(radius);
        // }

    }


}