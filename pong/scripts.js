

let player1;
let player2;
let ball;


let ballSize = 20;
let paddleThickness = 20;
let paddleHeight = 100;
let k;


function setup() {



    createCanvas(500, 400);

    player1 = new Paddle(width - paddleThickness, (height - paddleHeight) / 2);
    player2 = new Paddle(0, (height - paddleHeight) / 2);
    ball = new Ball(width / 2, height / 2);
}


function keyPressed(e) {
    k = e.key;
    // player1.move(e.key);
}


function draw() {
    background(51);



    player1.show();
    player2.show();


    if (keyIsPressed === true) {
        player1.move(k);
    }



    player2.ai(ball);



    ball.update(player1, player2);
    ball.show();

    pointScored = ball.pointScored();

    if (pointScored == 1) {
        player1.addPoint();
    } else if (pointScored == 2) {
        player2.addPoint();
    };


    fill(255);
    textSize(32);
    text(player1.score, width / 2 - 30, 60);
    text(player2.score, width / 2 + 30, 60);
}
