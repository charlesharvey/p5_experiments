class Branch {


    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.y2 = y;
        this.x2 = x;
        this.angle = angle;
        this.shouldGrow = true;
        this.length = 0;
        this.children = [];
        this.maxLength = 25;
        this.speed = 1;
        this.newangle = 0.4;
        this.hasCrashed = false;
    }



    show() {


        stroke(0);
        strokeWeight(2);
        line(this.x, this.y, this.x2, this.y2);

        // if (this.children) {
        //     this.children.forEach(child => {
        //         child.show();
        //         child.update();
        //     });
        // }

    }

    update() {


        this.length += this.speed;

        // this.y2 =    this.y - this.length;
        this.x2 = Math.round(sin(this.angle) * this.length + this.x);
        this.y2 = Math.round(cos(this.angle) * this.length + this.y);




    }

    createLeftChild() {
        const child = new Branch(this.x2, this.y2, this.angle + this.newangle);
        return child;
    }


    createRightChild() {
        const child = new Branch(this.x2, this.y2, this.angle - this.newangle);
        return child;
    }


    intersects(others) {



        if (this.length > 3) {
            others.forEach(other => {
                if (other !== this && this.hasCrashed == false) {
                    let diffx = Math.abs((other.x2 - this.x2));
                    let diffy = Math.abs((other.y2 - this.y2));
                    if (diffx < 0.1 && diffy < 0.1) {
                        this.hasCrashed = true;
                        this.shouldGrow = false;
                        other.hasCrashed = true;
                        other.shouldGrow = false;
                    }
                }
            });
        }


    }

    intersectsPixels(pixels) {


        let totaloff = 0;
        let d = 2;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const off = 4 * ((Math.round(this.y2 + j) * d + 1) * width * d + (Math.round(this.x2 + i) * d + 1));
                const color = pixels[off];
                totaloff += color;
            }
        }


        // let off = (Math.round(this.y2) * width + Math.round(this.x2)) * 2 * 4;

        // console.log(totaloff);

        if (totaloff < 20) {

            this.hasCrashed = true;
            this.shouldGrow = false;
        }

    }
}