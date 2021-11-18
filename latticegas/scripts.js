

const grid = 5;

let cols, rows;


let particles;
const noOfParticles = 1000;

function setup() {


    // colorMode(HSB);
    createCanvas(windowWidth - 20, windowHeight - 20);

    cols = Math.floor(width / grid);
    rows = Math.floor(height / grid);

    particles = [];
    for (let i = 0; i < noOfParticles; i++) {
        const x = Math.floor(Math.random() * cols / 3);
        const y = Math.floor(Math.random() * rows / 3);
        const p = new Particle(x, y);
        particles.push(p);

    }

}



function draw() {
    background(0);
    noStroke();

    particles.forEach(p => {
        p.update();
        p.collide(particles);
        p.show();

    })


}


function mouseDragged() {

    const x = Math.floor(mouseX / grid);
    const y = Math.floor(mouseY / grid);
    console.log(x, y);
    particles.push(new Particle(x, y));
}