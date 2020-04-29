class Planet {




    constructor(label, radius, eccentricity, size, incr) {
        this.label = label;
        this.radius = radius;
        this.size = size * 2;
        this.eccentricity = 1 - eccentricity;


        this.angle = 0;
        this.x;
        this.y;
        this.incr = incr;

        this.records = {};


    }

    update() {
        this.angle += this.incr;
    }


    draw() {
        if (this.label == 'sun') {
            fill(255, 255, 0);
        } else {
            fill(255, 100, 100);
        }
        noStroke();



        this.x = this.radius * Math.sin(this.angle);
        this.y = this.eccentricity * this.radius * Math.cos(this.angle);
        ellipse(this.x, this.y, this.size, this.size);

        // textSize(10);
        // fill(255);
        // text(this.label, this.x + this.size, this.y + this.size);


        stroke(255, 60);
        noFill();
        ellipse(0, 0, this.radius * 2, this.eccentricity * this.radius * 2);


    }




}