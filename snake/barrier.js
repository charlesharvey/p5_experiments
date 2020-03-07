class Barrier {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    show() {

        fill(0, 0, 50);
        noStroke();

        rect(this.x * grid, this.y * grid, grid, grid);

    }
}