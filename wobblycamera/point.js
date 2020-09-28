class Point {


    constructor(x, y) {
        this.x = x;
        this.y = y;

        const xx = (map(x, 0, width, -1, 1));
        const yy = (map(y, 0, height, -1, 1));




        this.input = createVector(xx, yy);

        // multiply by complex number
        const f1 = this.powerify(this.input, 3);
        const f3 = createVector(1, 0);  // rotate 90deg
        const f4 = this.multiply(f3, f1);
        // const f5 = this.negate(f4, f1);
        // const f6 = createVector(wobble5, -wobble3);
        // const f7 = this.addify(f6, f5);
        // const f8 = this.powerify(f4, wobble4);
        this.output = f1;


        //  modulus

        //  this.output = this.modulus(this.output, 0.55);



    }


    normalize(minx, maxx, miny, maxy) {
        const newx = map(this.output.x, minx, maxx, 0, width);
        const newy = map(this.output.y, miny, maxy, 0, height);
        this.output.set(newx, newy);
    }


    modulus(a, n) {
        return createVector(a.x % n, a.y % n);
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