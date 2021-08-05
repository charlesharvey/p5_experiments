

let particles
let springs
let gravity
let wind
let target;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    gravity = createVector(0, -0.5);
    wind = createVector(0.3, 0);
    target = createVector(0, 0);


    particles = [];
    springs = [];
    for (let i = 0; i < 45; i++) {
        const x = 150 + i * 4;
        const y = 430;

        particles.push(new Particle(x, y))
        if (i > 0) {
            const a = particles[i];
            const b = particles[i - 1];

            springs.push(new Spring(a, b))
        }
    }

    last = particles.length - 1;
    particles[0].locked = true;
    particles[last].locked = true;

}


function mouseMoved() {
    target.set(mouseX, mouseY);
}


function draw() {
    background(0);


    fill(255);
    noStroke();
    text(`${mouseX}, ${mouseY}`, 40, 40);


    particles.forEach(particle => {


        let f = p5.Vector.sub(particle.pos, target);
        f.normalize().mult(-1);
        particle.applyForce(f);
        particle.applyForce(gravity);
        particle.update();
        particle.show();


        // stroke(255, 0, 0, 100);
        // noFill();
        // line(particle.pos.x, particle.pos.y, particle.pos.x + f.x, particle.pos.y + f.y);



    })


    springs.forEach(spring => {

        spring.update();
        spring.show();
    })





}
