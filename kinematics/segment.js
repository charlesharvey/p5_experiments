class Segment {




    constructor(x, y, len, ii, c) {
        this.a = createVector(x, y);
        this.b = createVector(x, y);

        this.len = len;
        this.theta = 0;
        this.ii = ii;

        this.color = color(c);

        this.update();
    }


    show() {
        noFill();
        strokeWeight(3)
        stroke(this.color);
        line(this.a.x, this.a.y, this.b.x, this.b.y);


    }


    update() {
        const x = this.a.x + (cos(this.theta) * this.len);
        const y = this.a.y + (sin(this.theta) * this.len);
        this.b.set(x, y);
    }


    follow(tx, ty) {
        const target = createVector(tx, ty);
        const dir = p5.Vector.sub(target, this.a);
        this.theta = dir.heading();

        dir.setMag(this.len);
        dir.mult(-1);

        this.a = p5.Vector.add(target, dir);

    }
}