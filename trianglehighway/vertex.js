class Vertex {
    constructor(i) {
        this.center = createVector(width / 2, height / 2);
        this.pos = createVector(0, -100);
        this.hue = map(i, 0, 2, 0, 255);
        this.xoff = i + random(10, 1000);
        this.yoff = i + random(10, 1000);
        this.label = 'A';
        this.angle = 0;
        this.size = min(width / 1.5, height / 1.5);
        if (i == 1) {
            this.label = 'B';
            this.center.x -= 100;
            this.center.y += 166;
        } else if (i == 2) {
            this.label = 'C';
            this.center.x += 100;
            this.center.y += 166;
        }
    }



    find_angle(A, C) {

        var AB = Math.sqrt(Math.pow(this.pos.x - A.x, 2) + Math.pow(this.pos.y - A.y, 2));
        var BC = Math.sqrt(Math.pow(this.pos.x - C.x, 2) + Math.pow(this.pos.y - C.y, 2));
        var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
        return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));


    }

    setAngle(others) {
        let a, c;
        others.forEach(o => {
            if (o !== this) {
                if (a === undefined) {
                    a = o;
                } else {
                    c = o;
                }
            }
        })

        this.angle = this.find_angle(a.pos, c.pos);

    }

    update() {

        const dx = map(noise(this.xoff), 0, 1, -this.size, this.size);
        const dy = map(noise(this.yoff), 0, 1, -this.size, this.size);
        this.pos.x = dx + this.center.x;
        this.pos.y = dy + this.center.y;

        this.xoff += 0.003;
        this.yoff += 0.003;


    }


    show() {

        fill(this.hue, 100, 100);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 15, 15);
        text(this.label, this.pos.x + 10, this.pos.y + 10);

        fill(this.hue, 30, 70);
        text(Math.round(degrees(this.angle)) + '°', this.pos.x + 20, this.pos.y + 10);
    }
}