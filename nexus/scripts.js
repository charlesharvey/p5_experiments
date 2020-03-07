
let particles = [];

let xx = 100;
let yy = 100;


function setup() {


    createCanvas(800, 600);

    for (let i = 0; i < 50; i++) {
        addParticle();
    }
}


function addParticle() {
    const particle = new Particle();
    particles.push(particle);
}

function removeParticle(particle) {
    const index = particles.indexOf(particle);
    particles.splice(index, 1);
}

function mouseMoved() {
    xx = mouseX;
    yy = mouseY;
}

function draw() {
    background(0);
    noFill();



    // if not overloading the graphics card, add more particles
    if (frameRate() > 30 && frameCount % 3 == 0) {
        addParticle();
    }

    particles.forEach(particle => {
        //   particle.show();
        particle.update();
        particle.vertexes(particles);
        if (particle.dead()) {
            removeParticle(particle);
        };
    });



    if (frameCount % 100 == 0) {
        console.log(particles.length, frameRate());
    }



}
