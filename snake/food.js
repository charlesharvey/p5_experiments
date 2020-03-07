class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    show() {

        fill(100, 100, 100);
        noStroke();


        ellipse(this.x * grid, this.y * grid, grid, grid);

    }


}