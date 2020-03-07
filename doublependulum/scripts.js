

let pendulum;


function setup() {


    createCanvas(600, 400);


    pendulum = new Pendulum(300, 200, 100, 250);

    pendulum.addChild();

}



function draw() {
    background(0);


    pendulum.show();
    pendulum.update();



}
