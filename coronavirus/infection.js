class Infection {

    constructor(amount, index) {
        this.amount = amount;
        this.index = index;
        this.pos;
        this.rad = 4;
        this.visible = false;
        this.highlighted = false;
        this.yesterday;
        this.actualpos;
        this.growth;

    }


    ypos() {
        if (logarithmic) {
            return map(Math.log(this.amount, 10), 1, Math.log(maxInfection, 10), h + border, border);
        }
        return map(this.amount, 0, maxInfection, h + border, border);
    }
    xpos() {
        return map(this.index, 0, infections.length - 1, border, w + border);
    }

    setPrev(yesterday) {
        this.yesterday = yesterday;
        this.growth = Math.round(this.amount / this.yesterday.amount * 100) - 100;
    }


    setPos() {
        let y = this.ypos();
        let x = this.xpos();
        this.pos = createVector(x, y);
    }

    update() {

        let y = this.ypos();
        let x = this.xpos();
        this.actualpos = createVector(x, y);
        this.pos.y = lerp(this.pos.y, this.actualpos.y, 0.1);
    }


    show() {


        if (this.pos == null) {
            this.setPos();
        }


        if (this.visible) {

            this.update();

            if (this.highlighted) {
                fill(255, 255, 0);
                this.rad = 8;
            } else {
                fill(200);
                this.rad = 4;

            }

            noStroke();


            ellipse(this.pos.x, this.pos.y, this.rad, this.rad);



            if (this.index % 3 == (infections.length - 1) % 3) {
                text(Math.round(this.amount), this.pos.x + 10, this.pos.y + 10);

            }


            if (this.highlighted && this.yesterday) {
                stroke(170);
                strokeWeight(1);
                const px = this.yesterday.xpos();
                const py = this.yesterday.ypos();
                line(this.pos.x, this.pos.y, px, this.pos.y);
                line(px, py, px, this.pos.y);
                text(`${this.growth}%`, px - 10, this.pos.y - 10)
            }


        }


    }



}