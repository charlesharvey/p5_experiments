class Particle {


    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(), random());
        this.acc = createVector(0, 0);
        this.hue = random(255);
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


    quantumTunnel() {
        if (Math.random() > 0.999) {
            const force = p5.Vector.random2D();
            force.mult(width);
            this.pos.add(force);
            // this.applyForce(force);
        }

    }

    attracted(target, repelDistance) {
        const force = p5.Vector.sub(target, this.pos);
        let dir2 = force.magSq(); // square the distance between the target and current position;
        dir2 = constrain(dir2, 0, 500);
        const g = 2.987;
        const strength = g / dir2;
        force.setMag(strength);

        const d = dist(target.x, target.y, this.pos.x, this.pos.y);
        if (d < repelDistance) {
            force.mult(-100);
        }

        this.applyForce(force);
        // this.acc = force.copy();
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(8);
        this.acc.mult(0); // createVector(0, 0);


    }

    show() {

        fill(150, 255 - this.hue, this.hue);
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }
}
