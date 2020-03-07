class Clock {


    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.time = options.time;
        this.minsinday = 12 * 60;
        this.isParent = options.isParent;

        this.children;
    }


    show() {

        fill(255);
        // noFill();

        stroke(0);


        push();

        translate(this.x, this.y);


        if (this.isParent) {
            strokeWeight(15);
            ellipse(0, 0, this.width, this.width);
            strokeWeight(6);
        } else {
            strokeWeight(2);
        }





        let hour = this.time / 60;

        let theta = hour / 12 * TWO_PI + PI;

        let xh = sin(theta) * this.width / 2 * 0.65;
        let yh = cos(theta) * this.width / 2 * 0.65;



        line(0, 0, xh, yh);


        if (this.isParent) {
            let minutes = this.time - (Math.floor(hour) * 60);
            let theta_mins = minutes / 60 * TWO_PI + PI;
            let xm = sin(theta_mins) * this.width / 2 * 0.85;
            let ym = cos(theta_mins) * this.width / 2 * 0.85;
            line(0, 0, xm, ym);

        } else {
            let xm = sin(PI) * this.width / 2 * 0.85;
            let ym = cos(PI) * this.width / 2 * 0.85;
            line(0, 0, xm, ym);
        }


        if (this.children) {
            this.children.forEach(child => {
                child.show();
                child.update();
            })
        }


        pop();

        // text(minutes, 10, 10);

    }

    update() {

        this.time = (this.time - speed); // % (this.minsinday);
        if (this.isParent) { }

    }

    removeChildren() {
        this.children = null;
    }


    addChildren() {

        if (this.children) {
            this.children.forEach(child => {
                child.addChildren();
            });

        } else {
            let clocks = []
            for (let i = 0; i < 12; i++) {
                const x = sin(i / 12 * TWO_PI + PI) * this.width / 2 * 0.75;
                const y = cos(i / 12 * TWO_PI + PI) * this.width / 2 * 0.75;
                let clock = new Clock({
                    x: x,
                    y: y,
                    width: this.width / 5,
                    time: this.time,
                    isParent: false
                });
                clocks.push(clock);

            }

            this.children = clocks;

        }


    }


}