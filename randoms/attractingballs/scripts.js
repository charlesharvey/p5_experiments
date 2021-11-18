


let balls = []


let target;
function setup() {



    createCanvas(windowWidth - 10, windowHeight - 10);



    target = createVector(width / 2, height / 2);

    for (let i = 0; i < 80; i++) {

        addParticle();
    }

    noStroke();

}

function addParticle() {
    const ball = new Ball(random(width), random(height));
    balls.push(ball);
}



function draw() {

    background(0);



    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];

        ball.attracted(target, 10000, false);

        balls.forEach((p, pi) => {
            if (pi != i) {
                ball.attracted(p.pos, p.r, true);
            }
        })


        ball.update();
        ball.show();


    }



    // if (frameRate() > 40) {
    //     addParticle();
    // };



}


// function mouseMoved() {
//     target.x = mouseX;
//     target.y = mouseY;
// }

