class Block {


    constructor(x, y) {
        this.width = squaresize;
        this.origx = x;
        this.origy = y;
        this.coordx = x;
        this.coordy = y;
        this.x, this.y;
        this.calcXY();
        this.hue = 128;
        this.highlighted = false;
        this.parentHighlighted = false;
        this.parentSelected = false;
    }

    calcXY() {
        this.x = this.coordx * this.width;
        this.y = this.coordy * this.width;
    }

    highlight(x, y) {
        if (x == this.coordx && y == this.coordy) {
            return true;
        }
        // if (x > this.x && x < (this.x + this.width)) {
        //     if (y > this.y && y < (this.y + this.width)) {
        //         return true;
        //     }
        // }

        return false;
    }


    show() {
        if (this.parentSelected) {
            fill(this.hue, 100, 100);
        } else if (this.highlighted) {
            fill(this.hue, 90, 90);
        } else if (this.parentHighlighted) {
            fill(this.hue, 85, 85);
        } else {
            fill(this.hue, 70, 70);
        }
        stroke(20);
        strokeWeight(3);
        rect(this.x, this.y, this.width, this.width);
    }
}