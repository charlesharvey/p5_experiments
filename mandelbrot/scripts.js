

let range = 3;
const grid = 1; // how good is the resolution lower is better
const iterations = 40; // how many repetitions before we say its in the set
let cx = -0.5602339296485604; // center to zoom in on
//-0.9074116198515704; // -0.1528; //  //-0.1011;
let cy = -0.6491237643363226; // center to zoom in on
// -0.27551488183554257; // 1.0397; // // 0.9563;
const stripyness = 140;
let mandys = []; // each pixel of the screen



function setup() {


    // createCanvas(windowWidth - 20, windowHeight - 20);
    createCanvas(270, 270);
    colorMode(HSB);
    noStroke();
    background(0);




    for (let x = 0; x < width; x += grid) {
        for (let y = 0; y < height; y += grid) {
            const mandy = new Mandy(x, y);
            mandys.push(mandy);

        }
    }



}


function mousePressed() {
    // move to new center
    const xpercent = mouseX / width;
    const ypercent = mouseY / height;

    const x1 = -range + cx;
    const x2 = range + cx;
    const y1 = -range + cy;
    const y2 = range + cy;

    // cx = lerp(cx, lerp(x1, x2, xpercent), 0.2); if mouseMoved
    // cy = lerp(cy, lerp(y1, y2, ypercent), 0.2);
    cx = lerp(x1, x2, xpercent);
    cy = lerp(y1, y2, ypercent);

    console.log(cx, cy, range);

}


function draw() {



    mandys.forEach(mandy => {
        mandy.calculate();
        mandy.show();

    })

    if (range > 0.00000001) {
        range *= 0.85;

    } else {
        noLoop();
    }



}


function complexMult(a, bi, c, di) {
    const ac = a * c;
    const bic = bi * c;
    const dia = di * a;
    const bd = bi * di * -1;

    return [ac + bd, bic + dia];
}
