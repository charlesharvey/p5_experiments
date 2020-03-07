
const sequence = [0];

let counter = 1;


function setup() {


    createCanvas(600, 800);

}


function addToSequence() {

    const last = sequence[sequence.length - 1];
    const lastMinusCounter = last - counter;
    const lastAddCounter = last + counter;

    if (lastMinusCounter < 1) {
        sequence.push(lastAddCounter);
    } else {
        if (sequence.includes(lastMinusCounter)) {
            sequence.push(lastAddCounter);
        } else {
            sequence.push(lastMinusCounter);
        }
    }
    // console.log(counter, last);
    counter++;
}

function draw() {
    background(0);

    // frameRate(1);
    // if (counter > 100) {
    //     noLoop();
    // }

    addToSequence();



    translate(width / 2, height / 2);


    const max = Math.max(...sequence);


    for (let index = 0; index < sequence.length; index++) {
        const element = sequence[index];
        let prev = sequence[index - 1];

        const radius = map(element, 0, max, 0, width);

        strokeWeight(1);
        stroke(255, 255);
        noFill();
        // ellipse(0, 0, radius, radius);

        if (prev === undefined) {
            prev = 0;
        }

        if (prev > element) {
            arc(element + prev, 0, radius, radius, PI, 0);
        } else {
            arc(element - prev, 0, radius, radius, 0, PI);
        }

    }


}