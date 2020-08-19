class Wall {
    constructor() {
        this.a = createVector(random(width / 2), random(height));
        this.b = createVector(random(width / 2), random(height));
        this.hue = color(random(0, 255), 100, 100);

        this.shadow;
        this.resetShadow();
    }



    xToShadowX(x) {
        const w2 = width / 2;
        const w = w2 / numberOfRays;
        return w2 + (x * w) + w / 2;

    }


    yToShadowY(y) {
        const w2 = width / 2;
        const w = w2 / numberOfRays;

        const h = map(y, 0, w2, height, 90);


        return height / 2 + h / 2;

    }

    drawShadow() {

        if (this.shadow.length > 0) {


            const minx = this.xToShadowX(this.shadow[0][0]);
            const maxx = this.yToShadowY(this.shadow[this.shadow.length - 1][0]);
            const miny = this.xToShadowX(this.shadow[0][1]);
            const maxy = this.yToShadowY(this.shadow[this.shadow.length - 1][1]);


            fill(0, 50, 50);
            beginShape();
            // vertex(minx, miny);
            // vertex(maxx, miny);
            this.shadow.forEach(s => {


                const w2 = width / 2;
                const w = w2 / numberOfRays;
                const x = this.xToShadowX(s[0]);
                const y = height / 2;
                const h = map(s[1], 0, w2, height, 90);

                const fx = x;
                const fy = y + h / 2;

                vertex(fx, fy);

            });
            vertex(maxx, height);
            vertex(minx, height);
            endShape(CLOSE);

        }



    }

    resetShadow() {
        this.shadow = [];
    }

    setAsBottom() {
        this.a.set(0, height);
        this.b.set(width / 2, height);
    }

    setAsTop() {
        this.a.set(0, 0);
        this.b.set(width / 2, 0);
    }

    setAsLeft() {
        this.a.set(0, 0);
        this.b.set(0, height);
    }
    setAsRight() {
        this.a.set(width / 2, 0);
        this.b.set(width / 2, height)
    }
}