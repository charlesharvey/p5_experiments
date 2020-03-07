class Peg {


    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        fill(0);
        noStroke();
        ellipse(this.x * gridsizeX, this.y * gridsizeY + 5, 10, 10);
    }


    createChildren(others) {
        let x1 = this.x + 1;
        let x2 = this.x - 1;
        let y = this.y + 1;

        let left = others.find(o => o.x == x1 && o.y == y);
        let right = others.find(o => o.x == x2 && o.y == y);

        let r = [];
        if (!left) {
            r.push(new Peg(x1, y))
        }

        if (!right) {
            r.push(new Peg(x2, y))
        }
        return r;

    }
}