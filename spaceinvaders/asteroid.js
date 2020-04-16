class Asteroid extends Spaceobject {

    constructor() {

        super();

        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.mult(2);
        this.r = random(20, 50);
        this.seed = random(1000, 10000);
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

}