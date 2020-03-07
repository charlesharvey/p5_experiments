class Arm {


    constructor() {

        this.xoff = random(3000);
        this.yoff = random(3000);
        this.len;
        this.number;
        this.segments;
        this.food;

        this.resetSegments();
        this.createFood();

        this.target = createVector(random(width), random(height));




    }

    resetSegments() {
        this.color = color(random(255), random(255), random(255));
        this.number = 1;
        this.len = Math.floor(random(30)) + 3;
        this.segments = [];
        this.addSegment();
    }

    addSegment() {
        if (this.number > 20) {
            this.resetSegments();
        } else {
            this.number++;
            const segment = new Segment(300, 200, this.len, this.number, this.color);
            this.segments.push(segment);
        }

    }


    eaten() {
        const d = dist(this.food.pos.x, this.food.pos.y, this.target.x, this.target.y);
        if (d < 20) {
            this.target = this.food.pos.copy();
            this.addSegment();
            return true;
        }
        return false;

    }



    createFood() {
        this.food = new Food(this.color);
    }




    follow() {
        if (followMode == 'mouse') {
            const p = createVector(mouseX, mouseY);
            this.target = p5.Vector.lerp(this.target, p, 0.03);
            if (random() < 0.005) {
                this.addSegment();
            }

        } else {
            if (this.food) {
                this.target = p5.Vector.lerp(this.target, this.food.pos, 0.03);
                if (this.eaten()) {
                    this.createFood();
                }

            }
        }

    }

    show() {



        let tx = map(noise(this.xoff), 0, 1, 0, width);
        let ty = map(noise(this.yoff), 0, 1, 0, height);

        if (followMode == 'food' || followMode == 'mouse') {
            tx = this.target.x;
            ty = this.target.y;
            // } else if (followMode == 'mouse') {
            //     tx = mouseX;
            //     ty = mouseY;
        }

        if (this.segments.length > 0) {
            this.segments[0].follow(tx, ty)
            this.segments[0].update();
            for (let i = 1; i < this.segments.length; i++) {
                const segment = this.segments[i];
                const prev = this.segments[i - 1];
                segment.follow(prev.a.x, prev.a.y);
                segment.update();
            }
        }

        this.segments.forEach(segment => {
            segment.show();
        });


        this.xoff += 0.01;
        this.yoff += 0.01;


        if (followMode == 'food') {
            if (this.food) {
                this.food.show();
            }

        }




    }
}