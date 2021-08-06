
class Vehicle {


    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = random(0.5, 10.5);
        this.maxForce = random(0.5, 4.5);
        this.r = 15;
        this.target;
        this.target_vel = createVector(0, 0);
        this.target_seed = random(10000);
        this.newTarget();
    }


    newTarget() {
        this.target = createVector(random(width), random(height))
    }

    seek(target) {
        let desire = p5.Vector.sub(target, this.pos);
        desire.setMag(this.maxSpeed);
        let steering = p5.Vector.sub(desire, this.vel);
        steering.limit(this.maxForce);
        this.applyForce(steering);
    }


    applyForce(force) {
        this.acc.add(force);
    }


    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);

        this.acc.mult(0);

        if (this.pos.dist(this.target) < this.r) {
            this.newTarget();
        }

        const x = (noise(this.target_seed) - 0.5) * 16;
        const y = (noise(this.target_seed + 10) - 0.5) * 16;

        this.target_vel.x = x;
        this.target_vel.y = y;
        this.target_seed += 0.04;
        this.target.add(this.target_vel);



        if (this.target.x > width) {
            this.target.x = 0;
        }

        if (this.target.x < 0) {
            this.target.x = width;
        }
        if (this.target.y > height) {
            this.target.y = 0;
        }
        if (this.target.y < 0) {
            this.target.y = height;
        }





    }


    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        noStroke();
        fill(this.maxSpeed * 5, this.maxSpeed * 20, 255);
        // ellipse(0, 0, this.r, this.r);
        triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
        pop();


        noStroke();
        fill(0, 255, 0);
        ellipse(this.target.x, this.target.y, 10, 10);


        // stroke(255, 40)
        // noFill();
        // line(this.target.x, this.target.y, this.pos.x, this.pos.y);

    }
}

