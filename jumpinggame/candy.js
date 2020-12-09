class Candy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 17;
        this.hue = 50;
        this.eaten = false;
    }

    show() {
        noStroke();
        fill(this.hue, 255, 255);
        ellipse(this.x, this.y, this.r, this.r);
    }
}