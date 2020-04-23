


let particles = []


let target;
function setup() {



    createCanvas(windowWidth - 10, windowHeight - 10);



    target = createVector(width / 2, height / 2);

    for (let i = 0; i < 8; i++) {

        addParticle();
    }



}

function addParticle() {
    const particle = new Particle(random(width), random(height));
    particles.push(particle);
}



function draw() {

    background(0);


    // fill(255, 255, 0);
    // ellipse(target.x, target.y, 5, 5);


    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];


        particles.forEach((p, pi) => {
            if (pi != i) {
                particle.attracted(p.pos, 50);
                particle.attracted(target, width / 8);


            }
        })



        particle.update();
        particle.show();


    }



    if (frameRate() > 40) {
        addParticle();
    };



}


function mouseMoved() {
    target.x = mouseX;
    target.y = mouseY;
}

