

// https://www.youtube.com/watch?v=BjoM9oKOAKY


let theta = 0;
let zeta = 100;
let walkers = 300;
let size = 1;
let transparency = 50;
let speed = 0.001;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    reset();

}

function reset() {
    background(0);
}


function mousePressed() {
    reset();
}

function draw() {

    fill(255, transparency);
    noStroke();


    for (let i = 0; i < walkers; i++) {
        const n1 = noise(theta + (i * 1000));
        const n2 = noise(zeta + (i * 1000));
        const x = map(n1, 0, 1, 0, width);
        const y = map(n2, 0, 1, 0, height);
        ellipse(x, y, size, size);

    }


    theta += speed;
    zeta += speed;


}
