class Quad {

    constructor(index, level, x, y, image) {
        this.index = index;
        this.level = level;


        this.width = bird.width / (Math.pow(2, level));


        this.x = x;
        this.y = y;

        this.origx = x;
        this.origy = y;


        this.imagex = 0;
        this.imagey = 0;
        if (index == 0) {

        } else if (index == 1) {
            this.x += this.width;
            this.imagex = this.width;
        } else if (index == 2) {
            this.y += this.width;
            this.imagey = this.width;
        } else if (index == 3) {
            this.x += this.width;
            this.y += this.width;
            this.imagex = this.width;
            this.imagey = this.width;

        }




        this.image = createImage(this.width, this.width);
        this.image.copy(image, this.imagex, this.imagey, this.width, this.width, 0, 0, this.width, this.width);


        this.children;
        this.amountmoved = 0;
        this.speed = (2 / (level + 1)) + (random(1, 4) / (level + 1));
        this.moving = false;
        this.finishedmoving = null;
    }


    splitIntoFour() {
        if (!this.moving) {
            if (this.level < 6) {
                if (this.children) {
                    this.children.forEach(quad => quad.splitIntoFour());
                } else {
                    this.children = [];
                    this.children.push(new Quad(0, this.level + 1, this.x, this.y, this.image));
                    this.children.push(new Quad(1, this.level + 1, this.x, this.y, this.image));
                    this.children.push(new Quad(2, this.level + 1, this.x, this.y, this.image));
                    this.children.push(new Quad(3, this.level + 1, this.x, this.y, this.image));
                }
            }
        }


    }

    update() {
        if (this.children) {
            this.children.forEach(c => {
                c.update();
            })
        }

        if (this.level > 0) {
            if (this.amountmoved < this.width) {
                this.finishedmoving = false;
                if (this.index == 0) {
                    this.x += this.speed;
                    this.amountmoved += this.speed;
                } else if (this.index == 1) {
                    this.y += this.speed;
                    this.amountmoved += this.speed;
                } else if (this.index == 2) {
                    this.y -= this.speed;
                    this.amountmoved += this.speed;
                } else if (this.index == 3) {
                    this.x -= this.speed;
                    this.amountmoved += this.speed;
                }

                this.moving = true;
            } else {


                this.moving = false;


                if (this.finishedmoving == false) {


                    if (this.index == 0) {
                        this.x = this.origx + this.width;
                    } else if (this.index == 1) {
                        this.y = this.origy + this.width;
                    } else if (this.index == 2) {
                        this.y = this.origy;
                    } else if (this.index == 3) {
                        this.x = this.origx;
                    }
                    if (this.index == 0) {
                        this.index = 1;
                    } else if (this.index == 1) {
                        this.index = 4;
                    } else if (this.index == 2) {
                        this.index = 0;
                    } else if (this.index == 3) {
                        this.index = 2;
                    }


                    this.finishedmoving = true;
                }


                // this.splitIntoFour();
            }
        }
    }

    show() {





        if (this.children) {
            this.children.forEach(c => {
                c.show();
            })

        } else {
            push();

            translate(this.x, this.y);


            image(this.image, 0, 0, this.width, this.width);
            // stroke(255 / 4 * this.index, 255, 255);
            // rect(0, 0, this.width, this.width);


            pop();
        }


    }
}