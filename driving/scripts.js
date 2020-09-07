

const WINNER_SCORE = 5000;
const CAR_SIZE = 66;

let cars;
let me;
let other;


let checkpoints;
let gameOver = false;



function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB, 255, 255, 255);
    rectMode(CENTER);

    cars = [];


    me = new Car();
    cars.push(me);

    other = new Car();
    cars.push(other);


    addCheckpoints();

}

function addCheckpoints() {
    checkpoints = [];

    for (let i = 0; i < 50; i++) {
        addCheckpoint();
    }
}


function addCheckpoint() {

    const cp = new Checkpoint();
    checkpoints.push(cp);

}


function reset() {


    gameOver = false;
    cars.forEach(car => car.reset());
    addCheckpoints();



}

function keyPressed() {
    if (key == ' ') {
        reset();
    }
}


function draw() {
    background(90, 120, 150);



    // draw checkpoints
    if (!gameOver) {
        checkpoints.forEach(cp => {
            cars.forEach(car => {
                cp.hitCheckpoint(car);
            });
            if (cp.car) {
                // if its owned by a car, give that car some points;
                cp.car.addPoints();
            }
            cp.show();
            cp.update();
        });
    }


    if (keyIsDown(UP_ARROW)) {
        me.propel('forwards');
    } else if (keyIsDown(DOWN_ARROW)) {
        me.propel('backwards');
    }
    if (keyIsDown(LEFT_ARROW)) {
        me.rotate('left');
    } else if (keyIsDown(RIGHT_ARROW)) {
        me.rotate('right');
    }


    if (keyIsDown(87)) {
        other.propel('forwards');
    } else if (keyIsDown(83)) {
        other.propel('backwards');
    }
    if (keyIsDown(65)) {
        other.rotate('left');
    } else if (keyIsDown(68)) {
        other.rotate('right');
    }




    cars.forEach(car => {
        // if (car != me) {
        //     car.ai();
        // }
        car.show();
        car.update();
    });



    // if (frameCount % 120 == 0) {
    //     addCheckpoint();
    // }


    const winner = cars.find(c => c.points > WINNER_SCORE);
    if (winner) {
        gameOver = true;
        noStroke();
        fill(winner.hue, 255, 255);
        textSize(40);
        text(`game over`, width / 2, height / 2);

    }





}
