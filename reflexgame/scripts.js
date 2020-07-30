
let gameStarted;
let gameEnded;
let startTime;
let endTime;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    reset();
}

function reset() {
    gameStarted = false;
    gameEnded = false;
    startTime = null;
    endTime = null;
};

function mousePressed() {

    if (gameEnded) {
        reset();
    } else {
        if (gameStarted) {

            if (!startTime) {
                startTime = new Date();
            } else {
                endTime = new Date();
                gameEnded = true;
            }
        } else {
            gameStarted = true;
        }

    }

}



function draw() {
    background(0);

    translate(width / 2, height / 2);
    textSize(30);
    textAlign(CENTER);
    fill(255);
    stroke(255);
    if (gameEnded) {
        text('reset', 0, 0);
    } else {
        if (gameStarted) {

            if (startTime) {
                text(startTime, 0, 0);

                if (endTime) {
                    text(endTime, 20, 30);
                }


            } else {
                text('wait for it ...', 0, 0);
            }

        } else {
            text('Start Game', 0, 0)
        }

    }


}
