class Part {

    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);

        this.c = p5.Vector.lerp(this.a, this.b, 0.3333);
        this.d = p5.Vector.lerp(this.a, this.b, 0.6667);
        this.e = p5.Vector.lerp(this.a, this.b, 0.5);


        this.cx = width / 2;
        this.cy = height / 2;

    }

    splitInThree() {




        const r = p5.Vector.dist(this.a, this.b);


        const f = p5.Vector.sub(this.b, this.a);
        f.rotate(PI / 2);
        f.setMag(r / pointyness);
        f.add(this.e);

        const n1 = new Part(this.a.x, this.a.y, this.c.x, this.c.y);
        const n2 = new Part(this.d.x, this.d.y, this.b.x, this.b.y);
        const n3 = new Part(this.c.x, this.c.y, f.x, f.y);
        const n4 = new Part(f.x, f.y, this.d.x, this.d.y);
        return [n1, n2, n3, n4];

    }



    show() {


        stroke(255, 150);
        strokeWeight(1);
        noFill()
        line(this.a.x + this.cx, this.a.y + this.cy, this.b.x + this.cx, this.b.y + this.cy);


    }


    grow() {
        // this.a.mult(1.001);
        // this.b.mult(1.001);
    }
}