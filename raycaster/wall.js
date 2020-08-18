class Wall {
    constructor() {
        this.a = createVector(random(width / 2), random(height));
        this.b = createVector(random(width / 2), random(height));
    }


    setAsBottom() {
        this.a.set(0, height);
        this.b.set(width / 2, height);
    }

    setAsTop() {
        this.a.set(0, 0);
        this.b.set(width / 2, 0);
    }

    setAsLeft() {
        this.a.set(0, 0);
        this.b.set(0, height);
    }
    setAsRight() {
        this.a.set(width / 2, 0);
        this.b.set(width / 2, height)
    }
}