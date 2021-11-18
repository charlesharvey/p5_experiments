class Ball {


    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(), random());
        this.acc = createVector(0, 0);
        this.hue = random(255);
        this.r = 100;
        this.maxSpeed = 6;
    }


    applyForce(force) {
        this.acc.add(force);
    }




    attracted(target, repelDistance, gg, repel) {
        const force = p5.Vector.sub(target, this.pos);
        let dir2 = force.magSq(); // square the distance between the target and current position;
        dir2 = constrain(dir2, 0, 500);
        const g = gg; // 2.987;
        const strength = g / dir2;
        force.setMag(strength);
        const d = dist(target.x, target.y, this.pos.x, this.pos.y);
        if (repel && d < repelDistance) {
            force.mult(-50);
        }
        this.applyForce(force);

    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0); // createVector(0, 0);

        this.maxSpeed = max(0, this.maxSpeed * 0.991);


    }


    resetMaxSpeed() {
        this.maxSpeed = 4;
    }


    show() {

        fill(150, 255 - this.hue, this.hue);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}
