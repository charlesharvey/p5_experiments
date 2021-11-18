class Ball {


    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(), random());
        this.acc = createVector(0, 0);
        this.hue = random(255);
        this.r = 5;
    }


    applyForce(force) {
        this.acc.add(force);
    }


    // repel(target) {
    //     const d = dist(target.x, target.y, this.pos.x, this.pos.y);
    //     if (d < width / 8) {
    //         const force = p5.Vector.sub(target, this.pos);
    //         let dir2 = force.magSq(); // square the distance between the target and current position;
    //         dir2 = constrain(dir2, 0, 500);
    //         const g = 9.987;
    //         const strength = g / dir2;
    //         force.setMag(strength);
    //         force.mult(-100);
    //         this.applyForce(force);
    //     }
    // }




    attracted(target, targetDistance, repel = false) {

        const d = dist(target.x, target.y, this.pos.x, this.pos.y);
        if (d < targetDistance && d > this.r) {


            const force = p5.Vector.sub(target, this.pos);
            let dir2 = force.magSq(); // square the distance between the target and current position;
            force.setMag(dir2);
            if (repel) {
                force.mult(-1);
            }
            this.applyForce(force);

        }

    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.acc.mult(0); // createVector(0, 0);


    }

    show() {

        fill(150, 255 - this.hue, this.hue);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}
