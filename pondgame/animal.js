class Animal {

    constructor(settings) {
        this.pos = createVector(settings.x, settings.y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.r = settings.r;
        this.speed = settings.speed;
    }

    applyForce(force) {
        force.setMag(this.speed);
        this.pos.add(force);
    }


    update() {
        // // this.acc.limit(this.speed);
        // // this.vel.limit(this.speed);
        // this.pos.add(this.vel);

        // this.vel.add(this.acc);

        // this.acc.mult(0); // createVector(0, 0);
        // // this.vel.mult(0); // createVector(0, 0);



    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);

        noStroke();
        fill(200, 100, 100);
        ellipse(0, 0, this.r, this.r);
        pop();
    }

    inObstacle(target, radius) {
        const d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < (radius / 2)) {
            return true;
        }
        return false;
    }


}