
let resolution = 10;
let dx = 0;
let dy = 0;

let shouldDraw = true;
let shouldMoveUp = false;
let shouldMoveDown = false;
let shouldMoveLeft = false;
let shouldMoveRight = false;

function setup() {


    createCanvas(windowWidth, windowHeight);

    noiseSeed(100);
    colorMode(HSB);


}


function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        moveRight();

    } else if (keyCode == RIGHT_ARROW) {
        moveLeft();

    } else if (keyCode == UP_ARROW) {
        moveDown();

    } else if (keyCode == DOWN_ARROW) {
        moveUp();

    }
    shouldDraw = true;
}


function moveDown() {
    dy -= resolution;
}

function moveUp() {
    dy += resolution;
}

function moveRight() {
    dx -= resolution;
}
function moveLeft() {
    dx += resolution;
}

function mouseMoved() {

    shouldMoveDown = false;
    shouldMoveUp = false;
    shouldMoveLeft = false;
    shouldMoveRight = false;
    shouldDraw = false;


    if (mouseX > width - 100) {
        shouldMoveLeft = true;
        shouldDraw = true;
    } else if (mouseX < 100) {
        shouldMoveRight = true;
        shouldDraw = true;
    }

    if (mouseY > height - 100) {
        shouldDraw = true;
        shouldMoveUp = true;
    } else if (mouseY < 100) {
        shouldDraw = true;
        shouldMoveDown = true;

    }



}



function drawStars() {


    background(0);
    for (let x = 0; x < width; x += resolution) {
        for (let y = 0; y < height; y += resolution) {

            const seed = (x + dx) + ((y + dy) * width);
            // noiseSeed(seed);
            const n = noise(seed / TWO_PI);

            if (n < 0.12) {
                const sun = new Sun(x, y, n);
                sun.show();
            }

        }
    }


}





function draw() {



    if (shouldDraw) {
        drawStars();
    }


    if (shouldMoveDown) {
        moveDown();
    }


    if (shouldMoveUp) {
        moveUp();
    }

    if (shouldMoveLeft) {
        moveLeft();
    }
    if (shouldMoveRight) {
        moveRight();
    }








}
