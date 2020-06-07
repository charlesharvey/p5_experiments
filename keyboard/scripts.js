const lowA = 110; /// two octave below middle A
const twelthrootoftwo = Math.pow(2, 1 / 12);
const keysToShow = 25;
const keys = [];
const offset = 100;
const keyHeight = 200;
const keyWidth = 20;
const blackIndices = [1, 3, 6, 8, 10];
let curX, curY;


document.getElementById('allow').addEventListener('click', function () {
    allowAudio();

});



function allowAudio() {
    document.getElementById('allow').style.display = 'none';
    setUpAudio();
    reset();
    // keys.forEach(key => {
    //     key.allowAudio();
    // })
    context.resume();
}

let a, context, g, o;
function setUpAudio() {

    a = window.AudioContext || window.webkitAudioContext;
    context = new a;
    g = context.createGain();
    g.connect(context.destination);
    // o = context.createOscillator();
    // o.connect(g)
    // o.type = 'sine';
    // o.start();


}




function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);
    textAlign(CENTER);




}

function reset() {
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


    keys.filter(k => k.color === 'white').forEach(key => {
        key.highlight(curX, curY);
        key.show();
    })

    keys.filter(k => k.color === 'black').forEach(key => {
        key.highlight(curX, curY);
        key.show();
    })

}
