class Piece {


    constructor(label, x, y, blocks) {
        this.label = label;
        this.coordx = x;
        this.coordy = y;
        this.origx = x;
        this.origy = y;
        this.pos = createVector(x, y);
        this.calcXY();
        this.blocks = blocks;
        this.highlighted = false;
        this.selected = false;
        this.width = squaresize;
        this.hue = random(0, 250);

        this.setIntitalBlockPos();

    }


    setIntitalBlockPos() {
        this.blocks.forEach(block => {
            block.coordx = block.origx + this.coordx;
            block.coordy = block.origy + this.coordy;
            block.calcXY();

            block.hue = this.hue;
        })
    }

    calcXY() {
        this.pos.x = this.coordx * this.width;
        this.pos.y = this.coordy * this.width;
    }


    select() {
        this.selected = true;
        this.blocks.forEach(block => {
            block.parentSelected = true;
        })
    }

    unselect() {
        this.selected = false;
        this.blocks.forEach(block => {
            block.parentSelected = false;
        })
    }


    highlight(mx, my) {
        this.highlighted = false;

        this.blocks.forEach(block => {
            block.highlighted = false;
            block.parentHighlighted = false;
            if (block.highlight(mx, my)) {
                block.highlighted = true;
                this.highlighted = true;
            }
        })
        if (this.highlighted) {
            this.blocks.forEach(block => {
                block.parentHighlighted = true;
            })
        }

    }


    mirror() {
        this.blocks.forEach(block => {
            const temp = block.coordx;
            block.coordx = block.coordy;
            block.coordy = temp;
            block.calcXY();
        })
    }

    setNewOrig() {
        this.origx = this.coordx;
        this.origy = this.coordy;
    }


    moveTo(newx, newy) {
        this.coordx = this.origx + newx;
        this.coordy = this.origy + newy;
        this.setIntitalBlockPos();
    }

    moveRight() {
        this.coordx++;
        this.setIntitalBlockPos();
        // this.blocks.forEach(block => {
        //     block.coordx++;
        //     block.calcXY();
        // })
    }
    moveLeft() {
        this.coordx--;
        this.setIntitalBlockPos();
        // this.blocks.forEach(block => {
        //     block.coordx--;
        //     block.calcXY();
        // })
    }
    moveUp() {
        this.coordy--;
        this.setIntitalBlockPos();
        // this.blocks.forEach(block => {
        //     block.coordy--;
        //     block.calcXY();
        // })
    }
    moveDown() {
        this.coordy++;
        this.setIntitalBlockPos();
        // this.blocks.forEach(block => {
        //     block.coordy++;
        //     block.calcXY();
        // })
    }

    show() {


        this.blocks.forEach(block => {
            block.show();
        });


        // noStroke();
        // fill(255);
        // text(`${this.label}-${this.origx}-${this.origy}`, this.coordx * this.width, this.coordy * this.width);


    }
}