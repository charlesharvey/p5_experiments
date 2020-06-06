class Bettercell {
    constructor() {

        this.foc1 = createVector(0, 0);
        this.foc2 = createVector(0, 0);

        this.vel1 = p5.Vector.random2D();
        this.vel1.setMag(0.4);
        this.vel2 = this.vel1.copy();
        this.vel2.mult(-1);

        this.pos = createVector(width / 2, height / 2);

        this.acc = createVector(0, 0); // p5.Vector.random2D();

        this.col = color(random(100, 255), random(50, 100), random(150, 255));
        this.r = 10;
        this.detail = 80;
        this.seedX = random(1000);
        this.seedY = random(10000);
        this.delta = 0;

        this.growthrate = 0.3;

        this.child;
        this.hasSplit = false;
        this.sizeForChild = 100;

    }


    edges() {
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



    }




    update() {
        this.edges();
        this.delta += 0.01;
        if (this.r < 100) {
            this.r += this.growthrate;

        } else {
            this.foc1.add(this.vel1);
            this.foc2.add(this.vel2);
        }
    }






    getVertices(pos) {
        for (let i = 0; i < TWO_PI; i += (TWO_PI / this.detail)) {


            const nx = noise(this.seedX + (i) + this.delta);
            const ny = noise(this.seedY + (i) + this.delta);
            const mx = map(nx, 0, 1, 0.7, 1.2);
            const my = map(ny, 0, 1, 0.7, 1.2);


            const x = (this.r * mx) * sin(i) + pos.x;
            const y = (this.r * my) * cos(i) + pos.y;
            vertex(x, y);
        }
    }


    show() {

        push();
        translate(this.pos.x, this.pos.y);
        fill(this.col);

        // stroke(255);
        // strokeWeight(3);
        noStroke();


        //  first focal point

        beginShape();
        this.getVertices(this.foc1);
        endShape(CLOSE);
        //  second focal point
        beginShape();
        this.getVertices(this.foc2);
        endShape(CLOSE);

        // fill(255, 0, 0);
        // ellipse(this.foc1.x, this.foc1.y, 5, 5);
        // ellipse(this.foc2.x, this.foc2.y, 5, 5);





        pop();






    }
}