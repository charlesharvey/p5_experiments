
const number = 9;
const lines = []
let theta = 0;
let zeta = 0;  // how much the lines should represent the correct angle, or a 0 angle
let speed = 0.02;
function setup() {


    createCanvas(600, 400);


    for (let i = 0; i < number; i++) {
        let theta = TWO_PI / number * i / 2;
        lines.push(new Line(theta));
    }

}



function draw() {
    background(255);

    translate(width / 2, height / 2);
    rotate(theta);

    lines.forEach(line => {
        line.show();
        line.update(speed);
        line.changeTheta(zeta);
    });
    theta -= (speed * 0.75);
    zeta += 0.01;


}
