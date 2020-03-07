class Point {


    constructor(x, y, i, j) {
        this.x = x;
        this.y = y;
        this.input = createVector(i, j);

        const f1 = this.powerify(this.input, 4);
        const f2 = this.powerify(this.input, 3);
        const f3 = createVector(3, 0);
        const f4 = this.multiply(f3, f2);
        const f5 = this.negate(f4, f1);
        const f6 = createVector(1, -2);
        const f7 = this.negate(f5, f6);
        this.output = f7;

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