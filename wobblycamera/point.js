class Point {


    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.input = createVector(x, y);

        const f1 = this.powerify(this.input, 4.7);
        const f3 = createVector(0, -2);
        const f4 = this.multiply(f3, f1);
        const f5 = this.negate(f4, f1);
        // const f6 = createVector(-14.3, -1120);
        // const f7 = this.addify(f6, f5);
        const f8 = this.powerify(f5, 1 / 3.1);
        this.output = f8;


    }


    normalize(minx, maxx, miny, maxy) {
        const newx = map(this.output.x, minx, maxx, 0, width);
        const newy = map(this.output.y, miny, maxy, 0, height);
        this.output.set(newx, newy);
    }

    powerify(a, n) {
        let ret = a;
        for (let i = 0; i < n - 1; i++) {
            ret = this.multiply(ret, a);

        }
        return ret;
    }

    negate(a, b) {
        let x = a.x;
        let yi = a.y;
        let u = b.x;
        let vi = b.y;

        let aaa = x - u;
        let bbb = yi - vi;
        return createVector(aaa, bbb);
    }

    addify(a, b) {
        let x = a.x;
        let yi = a.y;
        let u = b.x;
        let vi = b.y;

        let aaa = x + u;
        let bbb = yi + vi;
        return createVector(aaa, bbb);
    }


    multiply(a, b) {
        let x = a.x;
        let yi = a.y;
        let u = b.x;
        let vi = b.y;
        let aaa = (x * u) - (yi * vi);
        let bbb = (x * vi) + (yi * u);

        return createVector(aaa, bbb);


    }



}