

let stars;

const numberOfStars = 250;
const lateralSpeed = 3;
const globalMag = 2;

const minStarSize = 0.5;
const maxStarSize = 5;
const minStarZ = 0.5;
const maxStarZ = 3;

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


    for (let i = 0; i < 10; i++) {
        if (stars.length < numberOfStars) {
            createStar();
        }
    }


    if (frameCount % 100 == 0) {
        console.log(stars.length);
    }

}
