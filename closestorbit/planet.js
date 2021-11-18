class Planet {




    constructor(label, radius, eccentricity, size, chartpos) {
        this.label = label;
        this.radius = radius;
        this.size = size * 2;
        this.eccentricity = 1 - eccentricity;
        this.chartpos = chartpos;

        this.angle = 0;
        this.x;
        this.y;

        this.records = {};


        this.incr = Math.sqrt(10 * this.size / this.radius) / 20;


    }

    update() {
        // const incr = map(this.radius, 0, 900, 0.05, 0.002);
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
        text(this.label, this.x + this.size, this.y + this.size);


        stroke(255, 60);
        noFill();
        ellipse(0, 0, this.radius * 2, this.eccentricity * this.radius * 2);


    }


    nearest(others) {

        let closest = null;
        let closestDist = Infinity;

        others.forEach(other => {
            if (other != this) {
                const d = dist(other.x, other.y, this.x, this.y);
                if (d < closestDist) {
                    closest = other;
                    closestDist = d;
                }
            }

        });

        if (closest) {
            if (closest.radius < this.radius) { }
            stroke(255, 200);
            line(closest.x, closest.y, this.x, this.y);


            // RECORD WHICH PLANET IS CLOSEST
            if (this.records[closest.label] != undefined) {
                this.records[closest.label] = this.records[closest.label] + 1;
            } else {
                this.records[closest.label] = 0;
            }
        }
    }



    chart() {

        const vals = Object.values(this.records);
        let sum = 0;
        vals.forEach(v => sum += v);
        let cuml = 0;
        vals.forEach(v => {
            cuml += v;
            let h = cuml / sum * 200;  // 200 pixels bar chart
            fill(255, 70);
            rect(-width / 2 + this.chartpos, -height / 2 + 20, 20, h);
        });

    }
}