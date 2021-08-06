class Robot {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.previous_pos;
    }



    update() {
        loadPixels();
        const res = 6;
        const d = 8;
        let record_loc = null;
        let record_b = -9999;
        for (let theta = 0; theta <= TWO_PI; theta += (TWO_PI / res)) {

            const x = sin(theta) * d;
            const y = cos(theta) * d;
            const loc = createVector(x, y)
            let attempt = this.pos.copy().add(loc);

            let total_b = 0;
            for (let i = -5; i < 5; i++) {
                for (let j = -5; j < 5; j++) {
                    let pix = get(attempt.x + i, attempt.y + j);
                    total_b += pix[0] + pix[1] + pix[2]
                }
            }

            if (total_b > record_b) {
                let new_pos = p5.Vector.add(this.pos, loc);
                if (this.previous_pos) {
                    if (this.previous_pos.dist(new_pos) > d) {
                        record_b = total_b;
                        record_loc = loc;
                    }
                } else {
                    record_b = total_b;
                    record_loc = loc;
                }



            }
        }

        if (record_loc) {
            let new_poss = p5.Vector.add(this.pos, record_loc);
            this.previous_pos = this.pos.copy();
            this.pos = new_poss;
        }




    }


    show() {
        push();
        translate(this.pos.x, this.pos.y);

        fill(0, 0, 255);
        noStroke();
        rectMode(CENTER);
        rect(0, 0, 20, 20);
        pop();
    }
}