class Planet {




    constructor(label, radius, eccentricity, size) {
        this.label = label;
        this.radius = radius / 3;
        this.size = 10; //size;
        this.eccentricity = 1; // 1 - eccentricity;


        this.angle = 0;
        this.x;
        this.y;

        this.incr = Math.sqrt(10 * this.size / this.radius) / 20;


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

        textSize(10);
        fill(255);
        text(this.label, this.x + this.size / 2, this.y + this.size / 2);


        stroke(255, 60);
        noFill();
        ellipse(0, 0, this.radius * 2, this.eccentricity * this.radius * 2);


    }





}