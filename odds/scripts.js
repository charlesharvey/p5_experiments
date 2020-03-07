

const denoms = [2, 3, 5, 6, 10, 20, 30, 50, 100];
// const denoms = [100, 50, 30, 20, 10, 6, 5, 3, 2];

let total = 0;

function setup() {


    noCanvas();


}




function draw() {

    bestOddText(random() / 2);


    if (total >= 120) {
        noLoop();
    }

}




function bestOddText(p) {
    let rounded = Math.round(p * 1000) / 1000;
    let strings;
    if (rounded < 0.01) {
        strings = [rounded, ' = ', '< 1', '/', 100];
    } else if (rounded > 0.9) {
        strings = [rounded, ' = ', '> 9', '/', 10];

    } else {
        let best_denom = null;
        let best_numer = null;
        let best_diff = 99999999;

        denoms.forEach(denom => {
            for (let numer = 1; numer < denom; numer++) {

                if (numer == 1 || denom == 2 || denom == 3 || denom == 5 || denom == 10) {

                    let est = (numer / denom);
                    let diff = Math.abs(est - rounded);

                    if (diff < best_diff) {
                        best_diff = diff;
                        best_denom = denom;
                        best_numer = numer;
                    }

                }
            }
        });

        strings = [rounded, ' = ', best_numer, '/', best_denom];

    }

    createP(strings.join(' '));

    // console.log(strings);
    total++;


}
