


let particles = []


let target;
function setup() {



    createCanvas(windowWidth - 10, windowHeight - 10);



    target = createVector(width / 2, height / 2);

    for (let i = 0; i < 8; i++) {

        addParticle();
    }

    noStroke();

}

function addParticle() {

    let types = ['blargon', 'gloopton', 'zeptron'];

    const particle = new Particle(random(width), random(height), random(types));
    particles.push(particle);
}



function draw() {

    background(0);



    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];


        particles.forEach((p, pi) => {
            if (pi != i) {
                particle.attracted(p);
            }
        })


        particle.update();
        particle.show();


    }



    if (frameRate() > 30) {
        addParticle();
    };



}



