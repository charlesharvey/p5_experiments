


let balls = []


let target;
let center;

function setup() {



    createCanvas(windowWidth - 10, windowHeight - 10);


    target = createVector(width / 2, height / 2);
    center = createVector(width / 2, height / 2);

    for (let i = 0; i < 20; i++) {

        addBall();
    }

    noStroke();

}

function addBall() {
    const ball = new Ball(random(width), random(height));
    balls.push(ball);
}



function draw() {

    background(0);




    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];

        ball.attracted(center, 10000, 8, false);

        if (mouseIsPressed) {
            ball.attracted(target, 300, 5, true);
            ball.resetMaxSpeed();
        }

        balls.forEach((p, pi) => {
            if (pi != i) {
                ball.attracted(p.pos, p.r, 2, true);
            }
        })


        ball.update();
        ball.show();




    }




}


// function mouseDragged() {
//     balls.forEach(ball => {
//         ball.resetMaxSpeed();
//     });
// }

function mouseMoved() {
    target.x = mouseX;
    target.y = mouseY;
}

