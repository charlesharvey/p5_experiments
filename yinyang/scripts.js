

let big;
let small;


function setup() {


    createCanvas(600, 600);

    big = width - 50;
    small = big / 2;

    big = new Orb(big, 0, 0, null);
    big.addYinyang();

    // big.yin.addYinyang();
    // big.yang.addYinyang();


}



function draw() {
    background(127);
    noStroke();

    // scale(0.6);
    translate(width / 2, height / 2);

    big.show();
    big.update();



}
