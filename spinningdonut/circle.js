class Circle {

    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.r = r;
        this.child;

    }

    addChild() {

    }

    show() {

        stroke(255, 0, 0);
        strokeWeight(1);
        noFill();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}