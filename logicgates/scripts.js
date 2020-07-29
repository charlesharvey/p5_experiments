

let chips;
let wires;



function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    textAlign(CENTER);
    colorMode(HSB);


    reset();

}

function mousePressed() {
    reset();
}


function reset() {

    chips = [];
    wires = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const t = (Math.random() > 0.5) ? 'AND' : 'OR';
            const x = 350 * (i + 0.5);
            const y = 200 * (j + 0.5)
            const chip = new Chip(t, x, y);
            chips.push(chip);
        }
    }

    wires.push(new Wire(chips[0], 'O', chips[3], 'A'));
    wires.push(new Wire(chips[1], 'O', chips[3], 'B'));


    wires.push(new Wire(chips[2], 'O', chips[4], 'A'));
    wires.push(new Wire(chips[2], 'O', chips[4], 'B'));

    wires.push(new Wire(chips[4], 'O', chips[7], 'B'));

    wires.push(new Wire(chips[5], 'O', chips[8], 'B'));


    wires.push(new Wire(chips[3], 'O', chips[6], 'A'));
    wires.push(new Wire(chips[3], 'O', chips[6], 'B'));

    wires.push(new Wire(chips[6], 'O', chips[7], 'A'));

}


function draw() {
    background(0);



    chips.forEach(chip => {
        chip.show();

    });

    wires.forEach(wire => {
        wire.update();
        wire.show();

    })

    // frameRate(1);
    // noLoop();

}
