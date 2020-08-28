

let lissajous;
let cols;
let rows;
const grid = 300;


let thetax = 0;
let thetay = 0;
let thetaz = 0;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20, WEBGL);

    cols = Math.floor(width / grid);
    rows = Math.floor(height / grid);


    lissajous = [];


    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            for (let k = 1; k < 2; k++) {
                const lis = new Lissajou(i, j, k);
                lissajous.push(lis);

            }
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


    scale(0.5);
    // rotateX(thetax);
    rotateY(thetay);
    rotateZ(thetaz);



    lissajous.forEach(l => {
        l.show();
        l.update();
    });



    thetax += 0.011;
    thetay += 0.017;
    thetaz += 0.023;




}
