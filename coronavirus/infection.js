class Infection {

    constructor(amount, date, index, isPrediction) {
        this.amount = amount;
        this.date = date;
        this.index = index;
        this.pos;
        this.rad = 4;
        this.visible = false;
        this.highlighted = false;
        this.isPrediction = isPrediction;
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

    setYesterday(yesterday) {
        this.yesterday = yesterday;
        this.growth = Math.round(this.amount / this.yesterday.amount * 100) - 100;
    }


    formattedNumber(num) {
        if (num >= 10000) {
            const ss = num.toString().split("");
            let r = '';
            for (let i = ss.length - 1; i >= 0; i--) {
                r = `${ss[i]}${r}`;
                if ((ss.length - i) % 3 == 0 && i != 0) {
                    r = `,${r}`;
                }
            }
            return r;
        }
        return num;

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
            this.rad = 4;

            if (this.highlighted) {
                fill(255, 255, 0);
                this.rad = 8;
            } else if (this.isPrediction) {
                fill(255, 0, 100);
            } else {
                fill(200);
            }

            noStroke();


            ellipse(this.pos.x, this.pos.y, this.rad, this.rad);



            if ((this.index % howmanylabels == (data.length - 1) % howmanylabels) || this.highlighted || this.index == infections.length - 1) {
                const t = this.formattedNumber(Math.round(this.amount));
                text(t, this.pos.x + 10, this.pos.y + 10);

            }


            if (this.highlighted && this.yesterday) {
                stroke(170);
                strokeWeight(1);
                const px = this.yesterday.xpos();
                const py = this.yesterday.ypos();
                line(this.pos.x, this.pos.y, px, this.pos.y);
                line(px, py, px, this.pos.y);
                text(`${this.growth}%`, px - 10, this.pos.y - 10)
                text(`${this.date}`, border + 20, border + 20)
            }

            if (this.index == data.length - 1) {
                fill(0, 255, 255);
                ellipse(this.pos.x, this.pos.y, this.rad + 5, this.rad + 5);
            }


        }


    }



}