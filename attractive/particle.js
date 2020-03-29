class Particle {


    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(), random());
        this.acc = createVector(0, 0);
    }


    applyForce(force) {
        this.acc.add(force);
    }


    attracted(target) {
        const force = p5.Vector.sub(target, this.pos);
        let dir2 = force.magSq(); // square the distance between the target and current position;
        dir2 = constrain(dir2, 0, 500);
        const g = 9.987;
        const strength = g / dir2;
        force.setMag(strength);

        this.applyForce(force);
        // this.acc = force.copy();
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(10);
        this.acc.mult(0); // createVector(0, 0);


    }

    show() {
        noStroke();
        fill(100, 200, 250);
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }
}
