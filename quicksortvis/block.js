class Block {

    constructor(index, position) {
        this.index = index;
        this.position = position;
        this.width = 30;
        this.is_pivot = false;

        this.is_left = false;
        this.is_right = false;

        this.is_lower = false;
        this.is_upper = false;
    }


    setPosition(p) {
        this.position = p;
    }


    setPivotInformation(pos, ind) {

        this.is_right = false;
        this.is_left = false;
        this.is_pivot = false;
        this.is_lower = false;
        this.is_upper = false;

        if (this.position === pos) {
            this.is_pivot = true;
        } else if (this.position < pos) {
            this.is_left = true;
        } else if (this.position > pos) {
            this.is_right = true;
        }

        if (this.index < ind) {
            this.is_lower = true;
        } else if (this.index > ind) {
            this.is_upper = true;
        }


    }




    show() {

        const x = this.position * this.width + (this.position * 10) + 20;
        const h = map(this.index, 0, number_of_blocks, this.width, height / 2);
        const y = height - 20 - h;


        if (this.is_pivot) {
            fill(0, 100, 100);
        } else if (this.is_left) {
            fill(180, 100, 100);
        } else if (this.is_right) {
            fill(240, 100, 100);
        } else {
            fill(255, 100, 100);
        }

        noStroke();
        rect(x, y, this.width, h);

        fill(0);
        text(this.index + 1, x + this.width / 2 - 4, y + h - 10);

    }
}