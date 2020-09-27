

let bird;
let main;

function preload() {
    bird = loadImage('bird.jpg');
}
function setup() {


    createCanvas(600, 600);
    colorMode(HSB);
    noFill();

    main = new Quad(0, 0, 0, 0, bird);

}

function mousePressed() {
    if (main) {
        main.splitIntoFour();
    }
}



function draw() {
    background(0);
    image(bird, 300, 0);




    main.update();
    main.show();



}
