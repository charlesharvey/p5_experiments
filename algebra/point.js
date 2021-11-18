class Point {


    constructor(i, j) {


        this.i = i;
        this.j = j;

        this.input = this.coordToVector(i, j);



        const f1 = createVector(i, j);
        const f2 = this.powerify(f1, 2);
        const f3 = createVector(3, 0);
        const f4 = this.multiply(f3, f2);
        const f5 = this.negate(f4, f1);
        const f6 = createVector(1, -2);
        const f7 = this.negate(f5, f6);
        this.output = this.coordToVector(f4.x, f4.y);



        this.r = 6;
    }

    coordToVector(i, j) {
        const x = map(i, -range, range, 0, w);
        const y = map(j, -range, range, 0, h);
        return createVector(x, y);
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


    show() {

        noStroke();

        fill(255, 100, 20);
        ellipse(this.input.x, this.input.y, this.r, this.r);


        fill(100, 50, 200);
        ellipse(this.output.x, this.output.y, this.r, this.r);



    }



}