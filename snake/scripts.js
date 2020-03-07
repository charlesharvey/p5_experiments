

const speed = 5; // lower is faster
const grid = 20;
let cols, rows;

let snake1;
let snake2 = true;
let snakes;
let food;
let barriers = [];



function setup() {


    createCanvas(400, 400);

    cols = height / grid;
    rows = width / grid;

    makeNewSnake();
    // makeBarriers();
    makeNewFood();


    ellipseMode(CORNER);
    colorMode(HSB);


}


function keyPressed() {

    if (keyCode === LEFT_ARROW) {
        snake1.turn('left');
    } else if (keyCode === RIGHT_ARROW) {
        snake1.turn('right');
    } else if (keyCode === UP_ARROW) {
        snake1.turn('up');
    } else if (keyCode === DOWN_ARROW) {
        snake1.turn('down');
    }


    if (snake2) {
        if (keyCode === 87) {
            // w
            snake2.turn('up');
        } else if (keyCode === 65) {
            // a
            snake2.turn('left');
        } else if (keyCode === 83) {
            // s
            snake2.turn('down');
        } else if (keyCode === 68) {
            // d
            snake2.turn('right');
        }

    }


}


function makeNewFood() {

    if (!food) {
        cantAdd = false;
        const x = floor(random(rows));
        const y = floor(random(cols));
        snakes.forEach(snake => {
            snake.tail.forEach(bit => {
                if (bit.x === x && bit.y === y) {
                    cantAdd = true;
                }
            })
        })
        if (cantAdd) {
            makeNewFood();
        } else {
            food = new Food(x, y);
        }

    }


}


function makeBarriers() {
    barriers = [];

    // randomBarriers
    for (let i = 0; i < 5; i++) {
        const x = floor(random(rows));
        const y = floor(random(cols));
        barrier = new Barrier(x, y);
        barriers.push(barrier);
    }
    // for (let i = 0; i < 6; i++) {
    //     barrier = new Barrier((floor(rows / 2)), i);
    //     barriers.push(barrier);
    // }

}



function makeNewSnake() {

    snakes = [];
    const x = floor(random(cols));
    const y = floor(random(rows));
    snake1 = new Snake(x, y, 200);
    snakes.push(snake1);

    if (snake2 !== false) {
        const x2 = floor(random(cols));
        const y2 = floor(random(rows));
        snake2 = new Snake(x2, y2, 0);
        snakes.push(snake2);
    }


}

function draw() {
    background(0);



    snakes.forEach(snake => {
        snake.show();

    });


    if ((frameCount % speed) === 0) {
        snakes.forEach(snake => {

            if (food && snake === snake2) {
                snake.ai(food);
            }

            snake.update();
        });
    }


    // snakes.forEach(snake => {
    //     snake.lerp();
    // });


    snakes.forEach(snake => {
        if (snake.dead(barriers)) {

            snake.reset();
            // makeNewSnake();
        }
    });



    if (food) {
        food.show();
        snakes.forEach(snake => {
            if (snake.eaten(food)) {
                food = null;
                makeNewFood();
            }
        });
    }



    barriers.forEach(barrier => {
        barrier.show();
    })

    // draw grid
    stroke(19);
    strokeWeight(1);
    for (let i = 0; i < cols; i++) {
        line(0, i * grid, width, i * grid);
    }
    for (let i = 0; i < rows; i++) {
        line(i * grid, 0, i * grid, height);
    }


    if (snakes.length > 0) {
        textSize(16);
        fill(255, 50);
        text(`Score: ${snakes[0].score}`, 15, 15);
        if (snakes[0].highScore > -1) {
            text(`Highscore: ${snakes[0].highScore}`, 15, 30);
        }
    }


}
