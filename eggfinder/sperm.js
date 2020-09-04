class Sperm {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.normalizedVel = this.vel.copy();
        this.r = 5;
        this.sense = random(10, 100);
        this.speed = random(2, 6);

        this.noisex = random(10000);
        this.noisey = random(10000);
        this.heading = this.vel.heading();
        this.wiggleTheta = 0;

    }



    normalizeVel() {
        if (this.vel.mag() > 0) {
            this.normalizedVel = this.vel.copy().normalize();
        }

    }



    sniffEgg(egg) {

        const d = dist(egg.pos.x, egg.pos.y, this.pos.x, this.pos.y);

        if (d < (egg.r + this.r) / 2) {
            this.vel.mult(0);
        } else if (d < this.sense) {

            const force = p5.Vector.sub(egg.pos, this.pos);
            let dir2 = force.magSq(); // square the distance between the target and current position;
            dir2 = constrain(dir2, 1, 500);
            const g = 200;
            const strength = constrain(g / dir2, 1, this.speed);
            force.setMag(this.speed);
            this.vel = force.copy();
        } else {
            this.vel.x = map(noise(this.noisex), 0, 1, -this.speed, this.speed);
            this.vel.y = map(noise(this.noisey), 0, 1, -this.speed, this.speed);

        }

    }


    intersectingWall(wall) {
        return false;
    }


    avoidWalls(walls) {
        const vcopy = this.vel.copy().mult(5);
        walls.forEach(wall => {

            const intersectingpoint = wall.intersection(this.pos, vcopy);
            if (intersectingpoint) {

                this.vel.mult(0);
                // const d = dist(intersectingpoint.x, intersectingpoint.y, this.pos.x, this.pos.y);
                // if (d < 5) {

                // }
            }


        })
    }


    update() {

        this.pos.add(this.vel);
        this.heading = this.vel.heading();
        this.normalizeVel();

        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }

        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }


        this.noisex += 0.01;
        this.noisey += 0.01;
        this.wiggleTheta += 0.1;
    }

    show() {
        push();


        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        fill(255);
        noStroke();
        ellipse(0, 0, this.r, this.r);


        const sizeoftail = 10;
        for (let i = 0; i < sizeoftail; i++) {

            const r = Math.pow((sizeoftail - i), 2) / 15;

            // const xwiggle = map(cos(this.wiggleTheta + i), -1, 1, 0.6, 1.4);
            const ywiggle = map(sin(this.wiggleTheta + i), -1, 1, 0.6, 1.2);
            const x1 = (i * -(this.r * 0.4)); //xwiggle;
            const y1 = (i * -(this.r * 0.4)) * ywiggle;

            ellipse(x1, y1, r, r);

        }


        // sense radius
        // noFill();
        // stroke(255, 30);
        // ellipse(0, 0, this.sense, this.sense);
        pop();
    }
}