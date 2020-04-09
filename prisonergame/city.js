class City {
    constructor(x, y, fancycity) {
        this.pos = createVector(x, y);
        this.neighbours = [];
        this.highlighted = false;
        this.fancycity = fancycity;
    }



    addNeighbour(other) {
        this.neighbours.push(other);
    }


    show() {
        noStroke();
        fill(255);

        let r = 10;
        if (this.highlighted) {
            if (guardsTurn) {
                fill(100, 105, 255, 180);

            } else {
                fill(255, 100, 100, 180);
            }

            r = 20;
        }
        ellipse(this.pos.x, this.pos.y, r, r);


        this.neighbours.forEach(neighbour => {
            stroke(255);
            noFill();
            line(neighbour.pos.x, neighbour.pos.y, this.pos.x, this.pos.y);
        });





    }
}