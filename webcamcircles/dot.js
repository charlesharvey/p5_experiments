class Dot {


    constructor(x, y) {

        const randd = 100;
        this.home = createVector(x, y);
        // this.frame2;
        // this.pos = createVector(random(width), random(height));
        this.pos = createVector(x + random(-randd, randd), y + random(-randd, randd));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        // this.distAwayFromHome = 0;
        this.hue = 255;
        this.calcDist();
        this.maxSpeed = 17;
        this.beingused = false;
    }


    calcDist() {
        // this.distAwayFromHome = dist(this.home.x, this.home.y, this.pos.x, this.pos.y);
        // this.hue = map(this.distAwayFromHome, 0, 300, 255, 0);
    }


    setHue(hue) {
        this.hue = hue;
    }
    setHome(x, y) {
        this.home.x = x;
        this.home.y = y;
    }


    avoid(t) {
        const d = dist(t.x, t.y, this.pos.x, this.pos.y);
        if (d < 150) {
            const f = p5.Vector.sub(this.home, t);
            f.limit(10);
            this.applyForce(f);
        }
    }

    moveTo(t) {
        const f = p5.Vector.sub(t, this.pos);
        const d = f.mag();


        let speed = this.maxSpeed;
        const mindist = 49;
        if (d < mindist) {
            speed = map(d, 0, mindist, 0, this.maxSpeed * 0.5);
        }

        f.setMag(speed);
        const steer = p5.Vector.sub(f, this.vel);

        steer.limit(this.maxSpeed)
        this.applyForce(steer);




    }

    // addFrame(x, y) {
    //     this.frame2 = createVector(x, y);
    // }


    // moveToNextFrame() {
    //     if (this.frame2) {
    //         const temp = this.home.copy();
    //         this.home = this.frame2.copy();
    //         this.frame2 = temp.copy();
    //     }
    // }


    applyForce(force) {
        this.acc.add(force);
    }

    update() {


        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(12);
        this.acc.mult(0);

        this.calcDist();
    }


    show() {
        stroke(this.hue);
        strokeWeight(grid);
        point(this.pos.x, this.pos.y);
    }
}