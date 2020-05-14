class Blob {

    constructor() {
        this.pos = createVector(random(w), random(h));
        this.vel = p5.Vector.random2D()
        this.vel.mult(4);
        this.r = w / 25;
    }



    update() {
        this.pos.add(this.vel);

        if (this.pos.x > w || this.pos.x < this.r) {
            this.vel.x *= -1;
        }

        if (this.pos.y > h || this.pos.y < this.r) {
            this.vel.y *= -1;
        }
    }


    show() {

        fill(255, 0, 0);
        noStroke();

        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}