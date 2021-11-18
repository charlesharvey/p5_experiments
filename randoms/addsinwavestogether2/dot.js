class Dot {

    constructor(x, y, offset) {
        this.pos = createVector(x, y);
        this.offset = offset;

        this.values = [];
    }


    show() {
        ellipse(this.pos.x, this.pos.y, 4, 4);
    }


    addWave(freq) {

        const val = sin(((this.offset * TWO_PI) + time) * freq);
        this.values.push(val);
    }


    update() {
        let t = 0;
        let av = 0;
        this.values.forEach(v => t += v);
        if (this.values.length > 0) {
            av = t / this.values.length;
        }

        // if (this.offset > 0.5) { }
        // av = av * Math.pow(1 - this.offset, 2);


        this.pos.y = map(av, -1, 1, 100, height - 100);//   av * height / 2 + height / 2;
        this.values = [];
    }
}