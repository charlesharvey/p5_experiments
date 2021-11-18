class Key {
    constructor(letter, x, y) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.color = 150;

    }

    hovered(x, y) {
        if (this.mouseIsOver(x, y)) {
            this.color = 200;
        } else {
            this.color = 150;
        }
    }
    clicked(x, y) {
        if (this.mouseIsOver(x, y)) {
            this.color = 250;
        }

    }


    mouseIsOver(x, y) {
        return dist(x, y, this.x, this.y) < keySize / 2;
    }

    show() {

        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, keySize, keySize);
        fill(0);
        text(this.letter, this.x, this.y);
    }
}