class Clock {

    constructor(x, y, r, six, hand) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.minute = 0; // Math.random() * TWO_PI;
        this.hour = 0; // Math.random() * TWO_PI;
        this.six = six; // digital clock digit made up of 6 clocks; which part am i?
        this.hand = hand;
    }

    show() {
        noFill();
        stroke(100);
        strokeWeight(2);
        ellipse(this.x, this.y, this.radius, this.radius);


        stroke(255);
        push();
        translate(this.x, this.y);



        strokeWeight(1);
        stroke(150);
        for (let i = 0; i < 12; i++) {
            const theta = TWO_PI / 12 * i;
            const x1 = sin(theta) * (this.radius / 2);
            const y1 = cos(theta) * (this.radius / 2);
            ellipse(x1, y1, 2, 2);
        }


        // strokeWeight(2);
        // text(this.hand, 10, 10);
        rotate(this.minute);

        stroke(255);
        strokeWeight(8);

        line(0, 0, this.radius / 2, 0);
        pop();

        push();
        translate(this.x, this.y);
        rotate(this.hour);
        strokeWeight(8);
        line(0, 0, this.radius / 2, 0);
        pop();





    }

    updateClock(digit) {
        if (digit < this.positions().length) {
            const pos = this.positions()[digit];
            const me = pos[this.six];
            const newhour = me[0] / 8 * TWO_PI;
            const newminute = me[1] / 8 * TWO_PI;
            const lerpspeed = 0.0045 * Math.pow((this.hand + 1), 1.5);
            this.hour = lerp(this.hour, newhour, lerpspeed);
            this.minute = lerp(this.minute, newminute, lerpspeed);
        } else {
            this.updateTheta(0.02);
        }
    }


    updateTheta(theta) {
        this.hour += theta;
        this.minute += (theta * 3);
    }

    positions() {
        return [
            [[0, 2], [2, 4], [2, 6], [2, 6], [6, 0], [4, 6]],  //   0
            [[3, 3], [2, 2], [3, 3], [2, 6], [3, 3], [6, 6]],  //   1
            [[0, 0], [2, 4], [0, 2], [4, 6], [6, 0], [4, 4]],  //   2
            [[0, 0], [2, 4], [0, 0], [2, 6], [0, 0], [4, 6]],  //   3
            [[2, 2], [2, 2], [0, 6], [2, 6], [3, 3], [6, 6]],  //   4
            [[0, 2], [4, 4], [0, 6], [2, 4], [0, 0], [4, 6]],  //   5
            [[0, 2], [4, 4], [2, 6], [2, 4], [0, 6], [4, 6]],  //   6
            [[0, 0], [2, 4], [3, 3], [2, 6], [3, 3], [6, 6]],  //   7
            [[0, 2], [2, 4], [0, 2], [2, 4], [6, 0], [4, 6]],  //   8
            [[0, 2], [2, 4], [0, 6], [2, 4], [3, 3], [6, 6]],  //   9
        ]
    }



}