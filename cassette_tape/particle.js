class Particle {
    constructor(x, y) {


        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.locked = false;
        this.friction = 0.99;

        this.maxSpeed = 5;
    }


    applyForce(force) {
        let f = force.copy();
        this.acc.add(f);
    }

    update() {
        if (!this.locked) {
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);

            this.vel.mult(this.friction);
        }


    }

    show() {

        noStroke();
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }



}