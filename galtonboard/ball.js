class Ball {


    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.canSwitch = true;
        this.canMove = true;

    }

    draw() {

        fill(255, 0, 0);
        noStroke();
        ellipse(this.x * gridsizeX, this.y * gridsizeY, this.size, this.size);
    }

    update(pegs) {

        if (this.canMove) {
            const peg = pegs.find(p => p.x == this.x && (p.y == Math.floor(this.y)));
            if (peg) {
                if (this.canSwitch) {
                    const r = random();

                    if (r > 0.5) {
                        this.x += 1;
                    } else {
                        this.x -= 1;
                    }
                    this.canSwitch = false;
                }
            } else {
                this.canSwitch = true;
            }

            this.y += 0.2;
        }




    }

    stop() {
        this.canMove = false;
    }

    finished() {

        // if (this.y > numberofpegs + 1) {
        if ((this.y * gridsizeY) > height - 200) {

            return true;
        }

        return false;
    }
}