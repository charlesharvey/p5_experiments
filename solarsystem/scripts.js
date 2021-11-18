


let planets = [];
let sun;
let angle = 0;

function setup() {


    createCanvas(windowWidth - 10, windowHeight - 10);



    // label, radius, eccentricty, size
    planets.push(new Planet('mercury', 69, 0.205, 2.4));
    planets.push(new Planet('venus', 108, 0.006, 6));
    planets.push(new Planet('earth', 149, 0.0167, 6.3));
    planets.push(new Planet('mars', 249, 0.0934, 3.4));
    planets.push(new Planet('jupiter', 816, 0.048, 69));


    sun = new Planet('sun', 0, 0, 696);

}



function draw() {
    background(0);

    // resetMatrix();
    translate(width / 2, height / 2);


    planets.forEach(planet => {
        planet.draw();
        planet.update();

    });

    sun.draw();







}