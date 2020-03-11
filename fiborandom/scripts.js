

const rho = 0.71;


const sets = [];


function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);


    for (let i = 0; i < 3; i++) {

        let set = [1, 1];
        sets.push(set);

    }

}

function makeNewNumber(set) {
    const lngth = set.length;
    const last = set[lngth - 1];
    const secondlast = set[lngth - 2];

    if (random() > 0.5) {
        const a = addNumbers(last, secondlast);
        set.push(a)
    } else {
        const a = subtractNumbers(last, secondlast);
        set.push(a)
    }

}


function subtractNumbers(a, b) {
    return a - (rho * b);
}

function addNumbers(a, b) {
    return a + (rho * b);
}


function draw() {
    background(0);

    noFill();



    sets.forEach(set => {

        stroke(255);
        strokeWeight(1);


        const maxnumber = max(set);
        const minnumber = min(set);
        // const maxlog = log(maxnumber);
        // const minlog = log(minnumber);
        beginShape();
        set.forEach((number, i) => {
            const x = map(i, 0, set.length, 0, width);
            const y = map(number, minnumber, maxnumber, height, 0);
            // const y = map(log(number), minlog, maxlog, height, 0);
            // ellipse(x, y, 5, 5);
            vertex(x, y);
        });
        endShape();


        const liney = map(0, minnumber, maxnumber, height, 0);
        // const liney = map(0.1, minlog, maxlog, height, 0);



        stroke(100, 100, 0);
        line(0, liney, width, liney);

        if (set.length < 10000) {
            makeNewNumber(set);
        }


    });




}
