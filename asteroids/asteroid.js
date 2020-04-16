class Asteroid extends Spaceobject {

    constructor(pos, r, seed) {

        super();
        if (pos) {
            this.pos = pos.copy();
        } else {
            this.pos = createVector(random(width), random(height));
        }

        if (r) {
            this.r = r;
        } else {
            this.r = random(25, 60);
        }

        if (seed) {
            this.seed = seed;
        } else {
            this.seed = random(1000, 10000);
        }

        this.vel = p5.Vector.random2D();
        this.vel.mult(2);

    }


    update() {
        this.pos.add(this.vel);

        this.edges();
    }



    show() {

        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(200);
        strokeWeight(1);
        beginShape();
        for (let theta = 0; theta < TWO_PI; theta += 0.3) {
            const nn = map(noise(this.seed + (theta * 190)), 0, 1, 0.6, 1.6);
            const x = sin(theta) * (this.r * nn);
            const y = cos(theta) * (this.r * nn)
            vertex(x, y);
        }

        endShape(CLOSE);


        pop();
    }


    splitApart() {
        const ast1 = new Asteroid(this.pos, this.r / 2, this.seed + 0.5);
        const ast2 = new Asteroid(this.pos, this.r / 2, this.seed - 0.5);
        return [ast1, ast2];
    }

    collided(ship) {
        const d = dist(ship.pos.x, ship.pos.y, this.pos.x, this.pos.y);
        if (d < this.r + 10) {
            return true;
        }
        return false;
    }

}