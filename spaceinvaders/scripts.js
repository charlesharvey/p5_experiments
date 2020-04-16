

const numberOfAsteroids = 5;

let ship;
let asteroids;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    reset();

}

function reset() {

    ship = new Ship();
    asteroids = [];
    for (let i = 0; i < numberOfAsteroids; i++) {
        const asteroid = new Asteroid();
        asteroids.push(asteroid);

    }

}

function keyReleased() {
    if (key == 'ArrowUp') {
        ship.isThrusting = false;
    } else {
        ship.isRotating = false;
    }
}

function keyPressed() {

    if (key == 'ArrowRight') {
        ship.rotateRight();
    } else if (key == 'ArrowLeft') {
        ship.rotateLeft();
    } else if (key == 'ArrowUp') {
        ship.thrust();
    } else if (keyCode == 32) {
        // spacebar
        ship.shoot();
    }
}


function draw() {
    background(0);


    asteroids.forEach(asteroid => {
        asteroid.show();
        asteroid.update();
    })


    ship.show();
    ship.update();


}
