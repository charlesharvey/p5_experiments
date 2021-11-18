class Blob {
    constructor(area) {
        this.area = 5000;
        this.vertices;
        this.hue = random(255);
        this.pos = createVector(random(width), random(height));
        this.numberOfVertices = 5;
        this.addVertices();
        this.currentArea = Infinity;
    }


    addVertices() {
        this.vertices = [];
        for (let i = 0; i < this.numberOfVertices; i++) {
            const theta = i / this.numberOfVertices * TWO_PI;
            const r = this.area / 200 + random(0, 60);
            const x = sin(theta) * r;
            const y = cos(theta) * r;
            const v = createVector(x, y);
            this.vertices.push(v);
        }
        this.calcCurrentArea();

    };


    calcCurrentArea() {
        let total = 0;

        const vertices = this.vertices;

        for (var i = 0, l = vertices.length; i < l; i++) {
            var addX = vertices[i].x;
            var addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
            var subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
            var subY = vertices[i].y;

            total += (addX * addY * 0.5);
            total -= (subX * subY * 0.5);
        }

        this.currentArea = Math.abs(total);
    }


    calcVertices() {

        if (this.currentArea > this.area + 5) {
            this.vertices.forEach(v => v.mult(0.99));
            this.calcCurrentArea();
        } else if (this.currentArea < this.area - 5) {
            this.vertices.forEach(v => v.mult(1.01));
            this.calcCurrentArea();
        } else {
            // its about the right size
        }
    }


    show() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(0, 0, 255);
        strokeWeight(2);
        fill(this.hue, 150, 150);
        beginShape();
        this.vertices.forEach(v => {
            vertex(v.x, v.y);
        });
        endShape(CLOSE);
        pop();

    }
}