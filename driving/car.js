class Car {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.maxSpeed = 5;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.heading = random(TWO_PI);
        this.hue = random(0, 255);
        this.points = 0;
        this.xoff = random(100000);
    }


    reset() {
        this.pos = createVector(random(width), random(height));
        this.points = 0;
    }

    update() {


        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.vel.mult(0.9); // friction
        this.acc.mult(0);


        this.edges();



    }


    ai() {
        const n = noise(this.xoff);
        if (n > 0.52) {
            this.rotate('left');
        } else if (n > 0.1) {
            this.rotate('right');
        }

        this.propel('forwards');

        this.xoff += 0.1;
    }




    propel(direction) {
        let force = p5.Vector.fromAngle(this.heading);
        // force.setMag(this.maxSpeed);
        if (direction == 'backwards') {
            force.mult(-1);
        }

        this.acc.add(force);
    }


    addPoints() {
        this.points++;
    }


    rotate(direction) {
        // if (this.vel.mag() > 0.5) { // only rotate if moving forward // }
        if (direction == "left") {
            this.heading -= 0.1;
        } else {
            this.heading += 0.1;
        }


    }


    show() {

        const len = CAR_SIZE;
        const wdt = CAR_SIZE / 2;
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        noStroke();
        fill(this.hue, 255, 255);
        rect(0, 0, len, wdt);


        // bumper
        beginShape();
        vertex(len / 2, -wdt / 2);
        vertex(len / 2, wdt / 2);
        vertex(len / 2 + 10, 0);
        endShape(CLOSE);

        textSize(10);
        text(this.points, 30, 30);

        // tyres
        fill(0, 0, 80);
        rect(-len / 4, -15, 20, 10);
        rect(len / 4, -15, 20, 10);
        rect(-len / 4, 15, 20, 10);
        rect(len / 4, 15, 20, 10);

        pop();


        if (this.offScreen()) {
            noStroke();
            fill(this.hue, 255, 255);
            const y = constrain(this.pos.y, 0, height);
            const x = constrain(this.pos.x, 0, width);
            if (this.pos.x > width) {
                rect(width, y, 20, 20);
            } else if (this.pos.x < 0) {
                rect(0, y, 20, 20);
            }
            if (this.pos.y > height) {
                rect(x, height, 20, 20);
            } else if (this.pos.y < 0) {
                rect(x, 0, 20, 20);
            }
        }




    }

    offScreen() {
        return (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0);
    }



    edges() {
        // if (this.pos.x > width) {
        //     this.pos.x = 0;
        // } else if (this.pos.x < 0) {
        //     this.pos.x = width;
        // }

        // if (this.pos.y > height) {
        //     this.pos.y = 0;
        // } else if (this.pos.y < 0) {
        //     this.pos.y = height;
        // }


        if (Math.abs(this.pos.x) > width * 2 || Math.abs(this.pos.y) > height * 2) {
            this.pos.set(width / 2, height / 2);
        }
    }



    // setMaxSpeed(checkpoints) {

    //     let minDist = 10000000;
    //     checkpoints.forEach(cp => {
    //         const d = dist(cp.pos.x, cp.pos.y, this.pos.x, this.pos.y);
    //         if (d < minDist) {
    //             minDist = d;
    //         }
    //     });
    //     const s = constrain(minDist, 0.1, 100);
    //     this.maxSpeed = 10000 / (s * s); // constrain(s, 3, 0.1);

    // };




}