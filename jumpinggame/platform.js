class Platform {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = 30;
        this.hue = 100;
    }

    show() {
        noStroke();
        fill(this.hue);
        rect(this.x, this.y, this.w, this.h);
    }
}