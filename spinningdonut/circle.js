class Circle {

    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.r = r;
        this.child;


    }

    addChild() {

    }

    show() {

        noFill();
        stroke(hue, 220, 150);
        strokeWeight(1);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);



    }
}