class Person {


    constructor() {
        this.pos = createVector(random(width / 2), random(height));
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);
        this.applyingForce = false;

        this.state = 'p';   // p  potential i   infected    r  removed   
        this.infectionRadius = random(3, 30); // how close to an infected person before i get infected

        this.timeInfected = 0;
        this.timeToRecovered = random(50, 500);


        this.distancingAmount = random(20, 40); // how close will someone get before they get pushed in another direction

        this.goingToShop = false;
        this.hunger = random(0, 500);


        // if (Math.random() > 0.95) {
        //   this.makeInfected();
        // }
    }


    makeInfected() {
        this.state = 'i';
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

        // strokeWeight(1);
        // stroke(255);
        // line(this.pos.x, this.pos.y, this.pos.x + (this.vel.x * 5), this.pos.y + (this.vel.y * 5));
    }

    update() {

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(1.5);
        this.acc.mult(0); // createVector(0, 0);
        this.applyingForce = false;


        this.applyRandomForce();



        this.constrainInBoard();

        this.updateInfectionStats();

        this.updateHungerStats();
    }


    applyRandomForce() {
        if (!this.applyingForce) {
            if (random() > 0.92) {
                this.applyingForce = true;
                const randomForce = p5.Vector.random2D();
                randomForce.setMag(1);
                this.applyForce(randomForce);
            }
        }
    }

    constrainInBoard() {
        // CONSTRAIN WITH IN THE BOARD
        if (this.pos.x < 0) {
            this.pos.x = 0;
            this.applyForce(createVector(1, 0));
        } else if (this.pos.x > (width / 2)) {
            this.pos.x = width / 2;
            this.applyForce(createVector(-1, 0));
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
            this.applyForce(createVector(0, 1));
        } else if (this.pos.y > height) {
            this.pos.y = height;
            this.applyForce(createVector(0, -1));
        }
        // CONSTRAIN WITH IN THE BOARD
    }

    updateHungerStats() {
        this.hunger++;
        if (this.hunger > 500) {
            this.goingToShop = true;
        }
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

        // shuffle(people)
        people.filter(p => p != this)
            .forEach(other => {
                if (!this.applyingForce) {
                    const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);

                    if (d < this.distancingAmount) {
                        const force = p5.Vector.sub(other.pos, this.pos);
                        force.setMag(1);
                        force.mult(-1);
                        this.applyingForce = true;
                        this.applyForce(force);
                    }
                }

            })
    }

    goToShop(people) {

        if (this.goingToShop) {



            shuffle(people).filter(p => p != this)
                .forEach(other => {
                    if (!this.applyingForce) {
                        const d = dist(shop.x, shop.y, this.pos.x, this.pos.y);

                        const force = p5.Vector.sub(shop, this.pos);
                        force.setMag(3);
                        this.applyingForce = true;
                        this.applyForce(force);
                        if (d < 50) {
                            this.goingToShop = false; // got to the shop
                            this.hunger = 0;
                        }
                    }
                })

        }
    }


}