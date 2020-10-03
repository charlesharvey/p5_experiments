class Metronome {

    constructor(offset, index) {
        this.offset = offset;
        this.angle = offset;

        this.index = index;
        this.width = 100;
        this.speed = 0.07;
        this.color = map(index, 0, maxNumberOfMetronomes, 0, 255);

        this.history = [];




    }


    update() {
        // this.time++; // = this.speed;
        this.angle = ((time * this.speed) + this.offset) % TWO_PI;
        // this.angle = (this.angle + this.speed) % TWO_PI;


        this.addHistory();
    }

    calculateNewOffset(others) {
        let sumOfSines = 0;
        others.forEach(other => {
            if (other !== this) {
                // if you want them perfectly out of phase
                // sumOfSines += sin( this.offset - other.offset );
                // if you want them perfectly in phase
                sumOfSines += sin(other.offset - this.offset);
            }
        });

        this.newOffset = this.offset + (sumOfSines * (K / others.length));

    }

    applyNewOffset() {
        this.offset = this.newOffset;

    }




    addHistory() {


        // if (this.time % 2 == 0) {
        this.history.push(sin(this.angle));
        // }
        if (this.history.length > 300) {
            this.history.splice(0, 1);
        }
    }

    show() {
        push();
        translate((this.index + 1) * this.width, this.width + 10);


        push();
        // ARM
        translate(this.width / 2 - 15, 0);
        const theta = map(sin(this.angle), -1, 1, -0.7, 0.7);
        const x2 = sin(theta) * -this.width;
        const y2 = cos(theta) * -this.width;

        strokeWeight(5);
        stroke(this.color, 100, 100);
        line(0, 0, x2, y2);
        pop();


        // BODY
        fill(30, 60, 60);
        noStroke();
        rect(0, 0, this.width - 30, this.width);



        fill(30, 50, 50);
        textAlign(CENTER);
        textSize(23);
        text(Math.round(sin(this.offset) * 10) / 10, this.width / 2 - 13, this.width / 2);



        pop();
    }
}