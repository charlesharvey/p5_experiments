

let img;
let roses;

let mouseIsDown = false;
let brushsize = 20;
let brushColor;


function preload() {
    roses = loadImage('images/roses.jpg');
}

function setup() {


    createCanvas(roses.width, roses.height);

    img = createImage(roses.width, roses.height);
    brushColor = color(255, 0, 0);


}


function eraseImage(x, y) {

    img.loadPixels();
    roses.loadPixels();

    for (let i = x - brushsize; i < x + brushsize; i++) {
        for (let j = y - brushsize; j < y + brushsize; j++) {
            const d = dist(x, y, i, j);
            if (d < brushsize) {
                const r = getColorAtImage(roses, i, j);
                img.set(i, j, r);
            }
        }
    }
    img.updatePixels();
}


function drawOnImage(x, y) {
    img.loadPixels();

    for (let i = x - brushsize; i < x + brushsize; i++) {
        for (let j = y - brushsize; j < y + brushsize; j++) {
            const d = dist(x, y, i, j);
            if (d < brushsize) {
                img.set(i, j, brushColor);
            }
        }
    }
    img.updatePixels();
}


function getColorAtImage(img, x, y) {
    const index = (img.width * x + y) * 4;
    return img[index];
}


function mousePressed() {

    mouseIsDown = !mouseIsDown;

}


function mouseMoved() {


    if (mouseIsDown) {
        eraseImage(mouseX, mouseY);
    } else {
        drawOnImage(mouseX, mouseY);
    }

}

function draw() {



    image(roses, 0, 0);
    image(img, 0, 0);


}
