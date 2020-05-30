

let stars;

const numberOfStars = 200;
const lateralSpeed = 7;
const globalMag = 5;

const minStarSize = 0.6;
const maxStarSize = 7;

let tx = 0;
let ty = 0;



function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    reset();
}

function reset() {
    stars = [];

    for (let i = 0; i < numberOfStars; i++) {
        createStar();
    }
}
function mousePressed() {
    reset();
}

function mouseMoved() {
    tx = map(mouseX, 0, width, lateralSpeed, -lateralSpeed);
    ty = map(mouseY, 0, height, lateralSpeed, -lateralSpeed);
    // globalMag = map(mouseX, 0, width, 0, 10);
}

function createStar() {
    const star = new Star();
    stars.push(star);
}

function draw() {
    background(0);


    stars.forEach((star, i) => {
        star.show();
        star.update();

        if (star.edges()) {
            stars.splice(i, 1);
        }

        // strokeWeight(1);
        // stroke(255, 10);
        // line(mouseX, mouseY, star.pos.x, star.pos.y);
    });

    if (stars.length < numberOfStars) {
        createStar();
    }

}
