

let pendulum;


function setup() {


    createCanvas(600, 600);
    colorMode(HSB);
    reset();

}


function reset() {
    const le = random(100, 300);
    pendulum = new Pendulum(300, 30, le, 40);

    pendulum.addChild();
}

function mousePressed() {
    reset();
}


function draw() {
    background(0);

    if (pendulum.child) {
        pendulum.show();
        pendulum.update();
    }


    if (pendulum.history.length > 300) {
        reset();
    }


}
