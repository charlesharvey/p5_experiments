

let img;
let roses;

let mouseIsDown = false;
let brushsize = 20;
let brushColor;

let overlay = [];


function preload() {
    roses = loadImage('images/roses.jpg');
}

function setup() {





    createCanvas(roses.width, roses.height);

    img = createImage(roses.width, roses.height);
    brushColor = color(255, 0, 0);


    for (let i = 0; i < roses.width * roses.height; i++) {
        roses[i] = -1;
    }


}


function eraseImage(x, y) {

    // img.loadPixels();
    // roses.loadPixels();

    // for (let i = x - brushsize; i < x + brushsize; i++) {
    //     for (let j = y - brushsize; j < y + brushsize; j++) {
    //         const d = dist(x, y, i, j);
    //         if (d < brushsize) {
    //             const rr = getColorAtImage(roses, i, j);
    //             console.log(rr);
    //             img.set(i, j, rr);
    //         }
    //     }
    // }
    // img.updatePixels();

    const index = x * width + y;

    overlay[index] = -1;

}


function drawOnImage(x, y) {

    const index = x * width + y;

    overlay[index] = 255;

    // img.loadPixels();

    // for (let i = x - brushsize; i < x + brushsize; i++) {
    //     for (let j = y - brushsize; j < y + brushsize; j++) {
    //         const d = dist(x, y, i, j);
    //         if (d < brushsize) {
    //             img.set(i, j, brushColor);
    //         }
    //     }
    // }
    // img.updatePixels();
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
    // image(img, 0, 0);



    for (let x = 0; x < roses.width; x++) {
        for (let y = 0; y < roses.height; y++) {

            const index = x * roses.width + y;
            if (overlay[index] > -1) {
                point(x, y, overlay[index]);
            }
        }
    }

}
