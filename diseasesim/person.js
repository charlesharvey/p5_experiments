class Person {


    constructor() {
        this.pos = createVector(random(width / 2), random(height));
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);

        this.state = 'p';   // p  potential i   infected    r  removed   
        this.infectionRadius = random(6, 35); // how close to an infected person before i get infected

        this.timeInfected = 0;
        this.timeToRecovered = random(50, 500);


        this.distancingAmount = random(15, 50); // how close will someone get before they get pushed in another direction

        this.offX = random(100000);
        this.offY = random(100000);


        if (Math.random() > 0.95) {
            this.state = 'i';
        }
    }


    show() {


        if (this.state === 'p') {
            fill(255);
        } else if (this.state === 'i') {
            fill(255, 0, 0);
        } else {
            fill(0, 255, 50);
        }
        noStroke();
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }

    update() {

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(1);
        this.acc.mult(0); // createVector(0, 0);



        this.applyRandomForce();

        // const nx = map(noise(this.offX), 0.2, 0.8, 0, width / 2);
        // this.pos.x = nx;

        // const ny = map(noise(this.offY), 0.2, 0.8, 0, height);
        // this.pos.y = ny;

        // this.offX += 0.001;
        // this.offY += 0.001;


        this.constrainInBoard();

        this.updateInfectionStats();
    }


    applyRandomForce() {

        if (random() > 0.92) {
            const randomForce = p5.Vector.random2D();
            this.applyForce(randomForce);
        }
    }

    constrainInBoard() {
        // CONSTRAIN WITH IN THE BOARD
        if (this.pos.x < 0) {
            this.pos.x = 0;
        } else if (this.pos.x > (width / 2)) {
            this.pos.x = width / 2;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
        } else if (this.pos.y > height) {
            this.pos.y = height;
        }
        // CONSTRAIN WITH IN THE BOARD
    }

    updateInfectionStats() {
        // are they recovered, or it their illness still going on
        if (this.state === 'i') {
            if (this.timeInfected < this.timeToRecovered) {
                this.timeInfected++;
            } else {
                this.state = 'r';
            }

        }
    }

    applyForce(force) {
        this.acc.add(force);
    }


    infect(people) {
        // if i am potential, check all infected people,
        // see if i am close to them, if so, infect me
        people.filter(p => p != this)
            .filter(p => p.state === 'i')
            .forEach(other => {
                if (this.state === 'p') {
                    const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);
                    if (d < other.infectionRadius) {
                        this.state = 'i';
                    }
                }
            });
    }


    socialDistancing(people) {
        people.filter(p => p != this)
            .forEach(other => {
                const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);

                if (d < this.distancingAmount) {
                    const force = p5.Vector.sub(other.pos, this.pos);
                    force.setMag(1);
                    force.mult(-1);
                    this.applyForce(force);
                }

            })
    }


}