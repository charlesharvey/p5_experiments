const lowA = 220; /// one octave below middle A
const twelthrootoftwo = Math.pow(2, 1 / 12);
const keysToShow = 25;
const keys = [];
const offset = 100;
const keyHeight = 200;
const keyWidth = 30;
const blackIndices = [1, 3, 6, 8, 10];
let curX, curY;




function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);
    textAlign(CENTER);


    for (let i = 0; i < keysToShow; i++) {
        // + 3 is to get from A to C;
        const fr = lowA * (Math.pow(twelthrootoftwo, i + 3))
        const key = new Key(i, fr);
        keys.push(key);
    }


}

function mouseMoved() {
    curX = mouseX;
    curY = mouseY;
}

function mousePressed() {

    keys.forEach(key => {
        if (key.highlighted) {
            key.play();
        }
    });
}



function draw() {
    background(21);


    // fill(200);
    // noStroke();
    // rect(offset - 10, offset - 10, keyWidth * (keys.length + 1) + 20, keyHeight + 10);

    keys.forEach(key => {
        key.highlight(curX, curY);
        key.show();
    })


}
