class Cell {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        // createVector(random(width), random(height));

        this.vel = p5.Vector.random2D();
        this.vel.mult(0.3);
        this.acc = createVector(0, 0); // p5.Vector.random2D();
        this.col = color(random(100, 255), random(50, 100), random(150, 255));
        this.r = 1;
        this.detail = 20;
        this.seedX = random(1000);
        this.seedY = random(10000);
        this.delta = 0;

        this.growthrate = 0.2;

        this.child;
        this.hadChild = false;
        this.sizeForChild = 100;

    }


    addChild() {
        if (this.hadChild == false && this.r >= this.sizeForChild && this.child == null) {
            const newcell = new Cell();
            newcell.pos = this.pos.copy();
            newcell.vel.mult(0);

            // move cell away from center a bit
            const theta = random(0, TWO_PI);
            const offx = sin(theta) * this.r;
            const offy = cos(theta) * this.r;
            newcell.pos.x += offx;
            newcell.pos.y += offy;

            newcell.col = this.col;
            this.child = newcell;
            this.hadChild = true;
        }

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



        // if (this.pos.x > width - (this.r) || this.pos.x < 0 + (this.r)) {
        //     this.vel.x *= -1;
        // }
        // if (this.pos.y > height - (this.r) || this.pos.y < 0 + (this.r)) {
        //     this.vel.y *= -1;
        // }
    }


    split() {
        // if child is far enough from parent, delete it 
        // and return the child so it can be added to the main list of cells
        if (this.child) {
            const d = dist(this.pos.x, this.pos.y, this.child.pos.x, this.child.pos.y);
            if (d > this.r * 2) {
                const newcell = this.child;
                newcell.vel = p5.Vector.random2D();

                newcell.addChild();

                this.child = null;
                return newcell;
            }
        }
        return false;
    }



    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);

        this.acc.mult(0);
        this.edges();


        this.delta += 0.01;
        if (this.child) {
            // this.r -= (this.growthrate / 2)
        } else {
            if (this.r < this.sizeForChild) {
                this.r += this.growthrate;
            }
        }


    }


    getVertices() {
        for (let i = 0; i < TWO_PI; i += (TWO_PI / this.detail)) {
            const nx = noise(this.seedX + (i) + this.delta);
            const ny = noise(this.seedY + (i) + this.delta);
            const mx = map(nx, 0, 1, 0.7, 1.2);
            const my = map(ny, 0, 1, 0.7, 1.2);
            const x = (this.r * mx) * sin(i) + this.pos.x;
            const y = (this.r * my) * cos(i) + this.pos.y;
            vertex(x, y);

        }

    }


    show() {

        push();
        // translate(this.pos.x, this.pos.y);
        fill(this.col);

        stroke(255);
        strokeWeight(3);
        // noStroke();

        // ellipse(0, 0, this.r, this.r);
        beginShape();
        for (let i = 0; i < TWO_PI; i += (TWO_PI / this.detail)) {
            const nx = noise(this.seedX + (i) + this.delta);
            const ny = noise(this.seedY + (i) + this.delta);
            const mx = map(nx, 0, 1, 0.7, 1.2);
            const my = map(ny, 0, 1, 0.7, 1.2);
            const x = (this.r * mx) * sin(i) + this.pos.x;
            const y = (this.r * my) * cos(i) + this.pos.y;
            vertex(x, y);

        }


        if (this.child) {

            this.child.getVertices();
            this.child.update();
        }


        endShape(CLOSE);





        pop();






    }
}