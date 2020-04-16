class Star {


    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.z = random(0.4, 4);
    }


    show() {

        stroke(100);
        strokeWeight(this.z);
        point(this.x, this.y);

    }
}