
let pendulums = [];
const noOfPendulums = 20;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);

    for (let i = 1; i <= noOfPendulums; i++) {
        const x = width / 2;
        const y = 50;
        const len = map(i, 1, noOfPendulums, 150, 450);
        const hue = map(i, 1, noOfPendulums, 0, 255);
        const p = new Pendulum(x, y, len, hue);
        pendulums.push(p);
    }


}



function draw() {
    background(255);


    pendulums.forEach(pendulum => {
        pendulum.update();
        pendulum.show();
    })

}
