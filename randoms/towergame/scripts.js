

const grid = 5;
const max_block_width = 30;

let rows, cols, mid_col;
let stack;
let current;

let block_height = 5; // how many grid units thick

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    rectMode(CENTER);
    cols = Math.floor(width / grid);
    rows = Math.floor(height / grid);
    mid_col = Math.round(cols / 2);

    reset();
}


function reset() {
    stack = [];
    createNewCurrent();

}

function createNewCurrent() {
    current = new Block();
}

function draw() {
    background(0);

    // frameRate(1);


    if (keyIsDown(LEFT_ARROW)) {
        current.moveLeft();
    } else if (keyIsDown(RIGHT_ARROW)) {
        current.moveRight();
    }


    if (current) {
        current.show();
        current.update();
        if (current.touched()) {

            if (current.died()) {


                reset();
            } else {
                stack.push(current);
                createNewCurrent();
            }
        }
    }

    stack.forEach(block => {
        block.show();
    })


    if (stack.length * block_height > cols) {
        reset();
    }


}


function nthInStack(n) {
    if (stack.length > n - 1) {
        return stack[stack.length - n];
    }
    return null;

}
