

let lissajous;
let cols;
let rows;
const grid = 110;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    cols = Math.floor(width / grid);
    rows = Math.floor(height / grid);


    lissajous = [];


    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const lis = new Lissajou(i, j);
            lissajous.push(lis);

        }
    }

    colorMode(HSB);




}

function mousePressed() {

    lissajous.forEach(l => {
        l.clearHistory();

    });

}



function draw() {
    background(0);


    lissajous.forEach(l => {
        l.show();
        l.update();
    });




}
