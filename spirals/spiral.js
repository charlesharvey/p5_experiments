class Spiral {
    constructor() {


        this.randomize();



    }


    randomize() {
        this.pos = createVector(random(width), random(height));
        this.speed = random(-0.1, 0.1);
        this.radius = random(1, 9);

        this.hue = random(255);
        this.theta = 0;
        this.thickness = random(1, 6) + this.radius / 3;

        this.historyLength = random(100, 350);
        this.vertices = [];
    }


    update() {
        // archimedean spiral
        const x = (this.theta * this.radius) * sin(this.theta);
        const y = (this.theta * this.radius) * cos(this.theta);
        this.vertices.push(createVector(x, y));

        this.theta += this.speed;

        if (this.vertices.length > this.historyLength) {
            this.randomize();
        }
    }



    show() {


        push();
        translate(this.pos.x, this.pos.y);


        noFill();
        strokeWeight(this.thickness);


        if (this.vertices.length > this.historyLength / 2) {
            const s = map(this.vertices.length, this.historyLength / 2, this.historyLength, 255, 0);
            stroke(this.hue, saturation, 255, s);
        } else {

            stroke(this.hue, saturation, 255);
        }


        beginShape();

        this.vertices.forEach(v => {
            vertex(v.x, v.y);
        })

        endShape();

        pop();


    }
}