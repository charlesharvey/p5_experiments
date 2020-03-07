class Food {


    constructor(color) {
        const x = random(width);
        const y = random(height);
        this.color = color;

        this.pos = createVector(x, y);
    }


    show() {
        fill(this.color);
        noStroke();

        ellipse(this.pos.x, this.pos.y, 10, 10);
    }
}