
let numberOfStars = 50;
let border = 30;
let grid = 45;

let rowsOfEnemies = 3;
let colsOfEnemies = 13;

let ship;
let enemies;
let stars;


let score;
let highScore;




function setup() {

    getHighScore();

    createCanvas(windowWidth - 10, windowHeight - 10);

    reset();

}

function getHighScore() {
    highScore = localStorage.getItem('chspacevaders');
    if (highScore == null) {
        highScore = 0;
    }
}

function reset() {



    score = 0;

    numberOfEnemies = 5;
    ship = new Ship();
    enemies = [];
    for (let i = 0; i < rowsOfEnemies; i++) {
        for (let j = 0; j < colsOfEnemies; j++) {
            addEnemy(i, j);

        }
    }
    stars = [];
    for (let i = 0; i < numberOfStars; i++) {
        const star = new Star();
        stars.push(star);

    }

}

function addEnemy(row, col) {

    let enemy = new Enemy(col * grid, (row + 1) * grid);
    enemies.push(enemy);

}

function keyReleased() {
    if (key == 'ArrowRight') {
        ship.isMoving = false;
    } else if (key == 'ArrowLeft') {
        ship.isMoving = false;
    }

}

function keyPressed() {

    if (key == 'ArrowRight') {
        ship.moveRight();
    } else if (key == 'ArrowLeft') {
        ship.moveLeft();
    } else if (keyCode == 32) {
        // spacebar
        ship.shoot();
        updateScore(-1);

    }
}


function draw() {
    background(0);
    showStars();

    enemies.forEach(enemy => {
        enemy.show();
        enemy.update();
        if (enemy.collided(ship, 10)) {
            reset();
        };
    })



    for (let i = ship.lasers.length - 1; i >= 0; i--) {
        const laser = ship.lasers[i];
        if (laser.outOfBounds()) {
            ship.lasers.splice(i, 1);
            break;
        }
        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            if (laser.hits(enemy)) {



                updateScore(10);
                // remove laser and old enemy
                ship.lasers.splice(i, 1);
                enemies.splice(j, 1);
                break;
            }
        }
    }


    if (enemies.length == 0) {
        reset();
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
    text(`# Enemies: ${enemies.length}`, 20, height - 5);

}


function updateScore(points) {
    score += points;
    if (score > highScore) {
        highScore = score;

        localStorage.setItem('chspacevaders', highScore);
    }
}