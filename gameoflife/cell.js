class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hue = random(255);
        this.value = (Math.random() > 0.15) ? 0 : 1;
        this.newvalue;
        this.constancy = random(0, 255);

    }



    update() {

        let total = 0;
        let neighbours = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const x = (i + this.x);
                const y = (j + this.y);
                const ind = index(x, y);
                const other = cells[ind];

                if (other != this) {
                    total += cells[ind].value;
                    neighbours++;
                }

            }
        }

        this.constancy += 2;
        this.newvalue = this.value;
        if (this.value == 1) {
            if (total > 3 || total < 2) {
                this.newvalue = 0;
                this.constancy = 0; // has changed
            }
        } else {
            if (total == 3) {
                this.newvalue = 1;
                this.constancy = 0; // has changed
            }

        }

    }


    applyNewValue() {
        this.value = this.newvalue;
    }



    setTo(v) {
        this.value = v;
        this.newvalue = v;
        this.fakevalue = v;
    }


    show() {
        noStroke();
        // stroke(255);
        // strokeWeight(1);

        if (this.value == 1) {
            //    fill(255, 100);
            //  rect(this.x * grid, this.y * grid, grid, grid);
        } else if (this.constancy > 100) {

        } else {


            const sat = constrain(255 - (this.constancy * 2), 0, 255);
            const bri = map(this.value, 0, 1, 255, 130);
            const hue = map(sat, 0, 255, 20, 100);
            fill(hue, sat, bri);

            rect(this.x * grid, this.y * grid, grid, grid);

        }
    }
}