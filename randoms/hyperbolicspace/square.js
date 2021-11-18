class Square {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.children;
        this.hue = random(255);
        this.vertices;
        this.r = 100;

        this.addVertices();
    }

    addVertices() {
        this.vertices = [];
        for (let i = 0; i < TWO_PI; i += (TWO_PI / 4)) {
            const r = 100;
            const x = sin(i) * this.r + this.pos.x;
            const y = cos(i) * this.r + this.pos.y;
            vertex(x, y);
            this.vertices.push(createVector(x, y));
        }
    }

    addChildren() {
        if (this.children) {
            this.children.forEach(c => c.addChildren());
        } else {

            this.children = [];



        }

    }

    show() {
        fill(this.hue, 100, 100);
        noStroke();

        beginShape();
        this.vertices.forEach(v => {
            vertex(v.x, v.y);
        })
        endShape(CLOSE);


        if (this.children) {
            this.children.forEach(child => {
                child.show();
            });
        }
    }
}