

let numberOfAsteroids;
let numberOfStars;

let ship;
let asteroids;
let stars;

let score;
let highScore;




function setup() {

    getHighScore();

    createCanvas(windowWidth - 20, windowHeight - 20);

    reset();

}

function getHighScore() {
    highScore = localStorage.getItem('chasteroids');
    if (highScore == null) {
        highScore = 0;
    }
}

function reset() {
    score = 0;
    numberOfStars = 50;
    numberOfAsteroids = 5;
    ship = new Ship();
    asteroids = [];
    for (let i = 0; i < numberOfAsteroids; i++) {
        addAsteroid();

    }
    stars = [];
    for (let i = 0; i < numberOfStars; i++) {
        const star = new Star();
        stars.push(star);

    }

}

function addAsteroid() {

    let asteroid = new Asteroid();
    if (asteroid.collided(ship)) {
        console.log('collided');
        addAsteroid();
    } else {
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
        updateScore(-1);

    }
}


function draw() {
    background(0);
    showStars();

    asteroids.forEach(asteroid => {
        asteroid.show();
        asteroid.update();
        if (asteroid.collided(ship)) {
            reset();
        };
    })



    for (let i = ship.lasers.length - 1; i >= 0; i--) {
        const laser = ship.lasers[i];
        if (laser.outOfBounds()) {
            ship.lasers.splice(i, 1);
            break;
        }
        for (let j = asteroids.length - 1; j >= 0; j--) {
            const asteroid = asteroids[j];
            if (laser.hits(asteroid)) {
                if (asteroid.r > 25) {
                    newasteroids = asteroid.splitApart();
                    newasteroids.forEach(na => asteroids.push(na));
                }

                if (asteroids.length < numberOfAsteroids) {
                    addAsteroid();
                }

                updateScore(10);
                // remove laser and old asteroid
                ship.lasers.splice(i, 1);
                asteroids.splice(j, 1);
                break;
            }
        }
    }


    // make more difficult as time goes on
    if (frameCount % 500 == 0) {
        numberOfAsteroids++;
    }


    ship.show();
    ship.update();

    showScore();

}


function showStars() {
    stars.forEach(star => {
        star.show();
    })

}

function showScore() {
    fill(255);
    noStroke();
    textSize(20);
    text(`Score: ${score}`, 20, 20);
    text(`High Score: ${highScore}`, 20, height - 20);
    textSize(10);
    fill(128);
    text(`# Asteroids: ${asteroids.length}`, 20, height - 5);

}


function updateScore(points) {
    score += points;
    if (score > highScore) {
        highScore = score;

        localStorage.setItem('chasteroids', highScore);
    }
}