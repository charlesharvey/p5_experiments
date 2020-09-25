class Matrix {


    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;


        this.data = [];
        for (let x = 0; x < this.rows; x++) {
            this.data[x] = []
            for (let y = 0; y < this.cols; y++) {
                this.data[x][y] = 0;
            }
        }



    }


    static fromArray(array) {
        let m = new Matrix(array.length, 1);
        for (let i = 0; i < array.length; i++) {
            m.data[i][0] = array[i];
        }
        return m;
    }


    static multiply(a, b) {

        if (a.cols != b.rows) {

            throw new RangeError('cols and rows must match');
            // console.log('cols of a must match rows of b');
            // return undefined;
        }

        let result = new Matrix(a.rows, b.cols);
        for (let x = 0; x < result.rows; x++) {
            for (let y = 0; y < result.cols; y++) {
                // dot product of values in col
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.data[x][k] * b.data[k][y];
                }
                result.data[x][y] = sum;

            }
        }
        return result;
    }




    multiply(n) {
        if (n instanceof Matrix) {
            this.multiplyMatrix(n);
        } else {
            this.multiplyNumber(n);
        }
    }



    multiplyMatrix(b) {
        if (this.cols != b.cols || this.rows != b.rows) {

            throw new RangeError('cols and rows must match');
            // console.log('cols of a must match rows of b');
            // return undefined;
        }

        let result = new Matrix(this.rows, b.cols);
        for (let x = 0; x < result.rows; x++) {

            for (let y = 0; y < result.cols; y++) {
                this.data[x][y] *= b.data[x][y];

            }
        }
    }

    multiplyNumber(n) {
        // scalar multiply
        // multiply every item in.data by n
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                this.data[x][y] *= n;
            }
        }
    }


    map(fn) {
        // apply same function to every element
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                let val = this.data[x][y]
                this.data[x][y] = fn(val);
            }
        }
    }

    static map(a, fn) {
        // apply same function to every element
        let result = new Matrix(a.rows, a.cols);
        for (let x = 0; x < a.rows; x++) {
            for (let y = 0; y < a.cols; y++) {
                let val = a.data[x][y]
                result.data[x][y] = fn(val);
            }
        }
        return result;
    }



    static add(a, b) {
        // add each item of other.data to this.data
        // separately

        if (a.cols != b.cols || a.rows != b.rows) {

            throw new RangeError('cols and rows must match');
        }

        let result = new Matrix(a.rows, a.cols);
        for (let x = 0; x < a.rows; x++) {
            for (let y = 0; y < a.cols; y++) {
                result.data[x][y] = a.data[x][y] + b.data[x][y];
            }
        }
        return result;
    }


    static subtract(a, b) {
        // add each item of other.data to this.data
        // separately




        if (a.cols != b.cols || a.rows != b.rows) {
            throw new RangeError('cols and rows must match');
        }

        let result = new Matrix(a.rows, a.cols);
        for (let x = 0; x < a.rows; x++) {
            for (let y = 0; y < a.cols; y++) {
                result.data[x][y] = a.data[x][y] - b.data[x][y];
            }
        }
        return result;
    }





    add(n) {

        if (n instanceof Matrix) {
            this.addMatrix(n);
        } else {
            this.addNumber(n);
        }
    }



    addMatrix(b) {
        // add each item of other.data to this.data
        // separately
        if (this.cols != b.cols || this.rows != b.rows) {

            throw new RangeError('cols and rows must match');
            // console.log('cols and rows must match');
            // return undefined;
        }

        let data = [];
        for (let x = 0; x < this.rows; x++) {
            data[x] = [];
            for (let y = 0; y < this.cols; y++) {
                data[x][y] = this.data[x][y] + b.data[x][y];
            }
        }
        this.data = data;
    }

    addNumber(n) {
        // add n to  every item in.data 
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                this.data[x][y] += n;
            }
        }
    }




    sum() {
        let total = 0;
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                total += this.data[x][y];
            }
        }
        return total;
    }


    static transpose(a) {
        // swap rows and cols
        let result = new Matrix(a.cols, a.rows);
        for (let x = 0; x < a.rows; x++) {
            for (let y = 0; y < a.cols; y++) {
                result.data[y][x] = a.data[x][y];
            }
        }
        return result;
    }



    randomize() {
        // random number  between -1 and 1 for every item 
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                this.data[x][y] = Math.random() * 2 - 1;
                // this.data[x][y] = Math.floor(Math.random() * 10);
            }
        }

    }


    toArray() {
        let ar = [];
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                ar.push(this.data[x][y]);
            }
        }
        return ar;
    }



    show() {
        console.table(this.data)
    }


}