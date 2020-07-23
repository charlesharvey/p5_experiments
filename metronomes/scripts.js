
let metronomes = [];
let numberOfMetronomes = 0;
let startNumberOfMetronomes = 4;
let maxNumberOfMetronomes = 10;
let time = 0;
const K = 0.007;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);
    for (let i = 0; i < startNumberOfMetronomes; i++) {
        addMetronome(i, i);

    }



}
function addMetronome(offset, index) {

    if (numberOfMetronomes < maxNumberOfMetronomes) {

        const metronome = new Metronome(offset, index);
        metronomes.push(metronome);
        numberOfMetronomes = metronomes.length;
    }


}

function mousePressed() {
    // console.log(numberOfMetronomes);
    addMetronome(numberOfMetronomes, numberOfMetronomes);
}


function draw() {
    background(0);



    metronomes.forEach(metronome => {
        metronome.calculateNewOffset(metronomes);
        metronome.update();
        metronome.show();
    })


    metronomes.forEach(metronome => {
        metronome.applyNewOffset();
    });





    // draw history

    const maxLength = metronomes[0].history.length;
    metronomes.forEach((metronome) => {
        stroke(metronome.color, 100, 100);
        noFill();
        strokeWeight(1);
        beginShape();
        const myhistorylength = metronome.history.length;
        metronome.history.forEach((o, i) => {
            i = i + (maxLength - myhistorylength); // make graphs line up
            const y = map(o, -1, 1, metronome.width * 2 + 50, metronome.width * 2 + 200) + metronome.index;
            const x = map(i, 0, maxLength, 100, (startNumberOfMetronomes + 1) * metronome.width);
            vertex(x, y);
        })
        endShape();

    });




    if (frameCount % 100 == 0) {
        console.log(metronomes.map(m => Math.round(m.offset * 10)));
    }


    time++;

}
