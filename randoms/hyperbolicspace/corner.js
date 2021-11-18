class Corner {


    constructor(x, y) {
        this.pos = createVector(x, y);
        this.hue = random(255);
        fill(this.hue, 100, 100);
        this.children;
    }


    addChildren(a, b) {
        const p = this.pos;
        const pa = a.pos;
        const pb = b.pos;

        const thetaa = p5.Vector.sub(pa, p).heading();
        const thetab = p5.Vector.sub(pb, p).heading();
        const thetadiff = ((thetab - thetaa)) / 4 * 3;



        console.log(thetaa, thetab, thetadiff);


        this.children = [];

        for (let i = 1; i < 4; i++) {
            const t = thetab + (i * thetadiff);
            const v = p5.Vector.fromAngle(t);
            v.mult(90);
            v.add(this.pos);
            this.children.push(new Corner(v.x, v.y));

        }



        return this.children;


    }

    show() {
        fill(this.hue, 100, 100);
        ellipse(this.pos.x, this.pos.y, 5, 5);

        if (this.children) {
            this.children.forEach(c => {
                stroke(this.hue, 100, 100);
                line(c.pos.x, c.pos.y, this.pos.x, this.pos.y);
            })
        }


    }
}