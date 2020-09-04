class Egg {
    constructor() {
        const padding = 100;
        this.pos = createVector(padding + random(width - padding), padding + random(height - padding));
        this.vel = p5.Vector.random2D();
        this.vel.mult(0.2);
        this.r = 50;
    }


    update() {
        // this.pos.add(this.vel);

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

    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(255, 255, 205);
        stroke(250, 240, 100);
        strokeWeight(5);
        ellipse(0, 0, this.r - 5, this.r - 5);
        pop();
    }
}