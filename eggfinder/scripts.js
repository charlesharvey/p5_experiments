


let sperms;
let egg;
let walls;
const noOfSperm = 100;
const noOfWalls = 0;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    sperms = [];
    for (let i = 0; i < noOfSperm; i++) {
        const sperm = new Sperm();
        sperms.push(sperm);

    }
    walls = [];
    for (let i = 0; i < noOfWalls; i++) {
        const wall = new Wall();
        walls.push(wall);

    }

    egg = new Egg();

}



function draw() {
    background(17, 5, 0);

    // frameRate(1);


    sperms.forEach(sperm => {
        sperm.sniffEgg(egg);
        // sperm.avoidWalls(walls);
        sperm.update();
        sperm.show();

    })
    // walls.forEach(wall => {
    //     wall.show();
    // })


    egg.update();
    egg.show();


}
