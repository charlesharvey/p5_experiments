class Player {

    constructor(id, y) {
        this.id = id;
        this.y = y;
        this.pieces = [6, 5, 4, 3, 2, 1];

        if (this.id === 'orange') {
            this.hue = color(200, 100, 20);
        } else {
            this.hue = color(50, 70, 200);
        }
    }



    show() {

        push();
        translate(100, this.y);


        noStroke();
        fill(this.hue);



        this.pieces.forEach((piece, pi) => {
            ellipse(pi * 80, 0, piece * 10, piece * 10);
        })
        pop();
    }

}