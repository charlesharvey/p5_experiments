

let radius = 300;
const g = 0.3;
let gravity;
let balls;

class Ball {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.hue = random(255);
        this.maxSpeed = 5;
        this.r = 8;
    }

    bounce() {
        const px = this.pos.x;
        const py = this.pos.y;
        if ((px * px + py * py) >= (radius * radius)) {
            // put ball back in center
            // this.pos.set(random(-radius, radius), random(-radius, radius));
            // this.vel.mult(0);

            // reflect bounce   

            const cy = 0;
            const cx = 0;
            const theta = Math.atan2((this.pos.y - cy), (this.pos.x - cx)) + PI;



            const mag = this.vel.mag(); //* 1.03;
            this.vel = p5.Vector.fromAngle(theta).setMag(mag);



        }
    }

    update() {

        this.acc.add(gravity);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed)
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        fill(this.hue, 120, 100);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}




function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);
    gravity = createVector(0, g);

    balls = [];

    for (let i = 0; i < 10; i++) {
        const x = sin(random(TWO_PI)) * random(radius);
        const y = cos(random(TWO_PI)) * random(radius);
        const ball = new Ball(x, y);
        balls.push(ball);
    }

    // balls.push(new Ball(41.232, -30));
    // balls.push(new Ball(41.235, -30));


}



function draw() {



    background(255);
    translate(width / 2, height / 2);

    noFill();
    stroke(0);
    strokeWeight(3);
    ellipse(0, 0, radius * 2, radius * 2);


    balls.forEach(ball => {
        ball.bounce();
        ball.update();

        ball.show();
    })




}
