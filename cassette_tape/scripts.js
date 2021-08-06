


let gravity

let target;
let zeta;

let ribbons;
const noOfRibbons = 3;
const noOfParticles = 50;
const restLength = 8;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);
    gravity = createVector(0, -0.6);
    target = createVector(0, 0);
    zeta = random(1000);

    ribbons = [];

    for (let j = 0; j < noOfRibbons; j++) {
        const ribbon = { particles: [], springs: [], wind: null, theta: random(10000) };
        ribbon.wind = createVector(0, 0);
        const hue = map(j, 0, noOfRibbons, 50, 220);

        for (let i = 0; i < noOfParticles; i++) {
            const x = 110 + i * 4 + (j * 30);
            const y = 430;

            ribbon.particles.push(new Particle(x, y))
            if (i > 0) {
                const a = ribbon.particles[i];
                const b = ribbon.particles[i - 1];

                ribbon.springs.push(new Spring(a, b, hue))
            }
        }
        last = ribbon.particles.length - 1;
        ribbon.particles[0].locked = true;
        ribbon.particles[last].locked = true;


        ribbons.push(ribbon);

    }




}


function mouseMoved() {
    target.set(mouseX, mouseY);
}


function draw() {
    background(0);


    fill(255);
    noStroke();
    text(`${mouseX}, ${mouseY}`, 40, 40);

    p1 = map(noise(zeta), 0, 1, 10, noOfParticles / 3);
    p2 = map(noise(zeta), 0, 1, noOfParticles / 3 * 2, noOfParticles - 10);


    ribbons.forEach(ribbon => {

        let particles = ribbon.particles;
        let springs = ribbon.springs;

        particles.forEach((particle, pp) => {


            // let mouseForce = p5.Vector.sub(particle.pos, target);
            // mouseForce.normalize().mult(0.2); //.mult(-1); // repel
            // particle.applyForce(mouseForce);

            particle.applyForce(ribbon.wind);

            if ((pp > p1 && pp < p2)) {
                particle.applyForce(gravity.copy().mult(-0.1));
            } else {
                particle.applyForce(gravity);
            }

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


        const wx = map(noise(ribbon.theta), 0, 1, -0.5, 0.5);
        const wy = map(noise(ribbon.theta + 1000), 0, 1, -0.5, 0.5);
        ribbon.wind.set(wx, wy);
        ribbon.theta += 0.1;


    })


    zeta += 0.01;






}
