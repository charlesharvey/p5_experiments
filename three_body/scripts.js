let planets;

let center_of_mass;
let cm_history;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB);
  reset();
}

function reset() {
  planets = [];
  cm_history = [];
  // const numberOfPlanets = Math.floor(random(2, 6));
  // const haveSun = Math.random() > 0.5;
  // for (let i = 0; i < numberOfPlanets; i++) {
  //   const planet = new Planet();
  //   if (i == 0 && haveSun) {
  //     planet.makeSun();
  //   }
  //   planets.push(planet);
  // }

  ///three stars one planet
  const sun1 = new Planet();
  const sun2 = new Planet();
  const sun3 = new Planet();
  sun1.mass = 400;
  sun2.mass = 400;
  sun3.mass = 400;
  sun1.calculateR();
  sun2.calculateR();
  sun3.calculateR();

  const planet = new Planet();
  planet.mass = 20;
  planet.r = 5;

  planets.push(sun1);
  planets.push(sun2);
  planets.push(sun3);
  planets.push(planet);
}

function mousePressed() {
  reset();
}

function draw() {
  background(0);

  planets.forEach((planet) => {
    planets.forEach((other) => {
      if (planet !== other) {
        planet.gravitate(other);
      }
    });
  });

  planets.forEach((planet) => {
    planet.update();
    planet.show();
  });

  // show center of mass
  // let avx = 0;
  // let avy = 0;
  // let totalmass = 0;
  // planets.forEach((planet) => {
  //   totalmass += planet.mass;
  //   avx += planet.pos.x * planet.mass;
  //   avy += planet.pos.y * planet.mass;
  // });

  // avx /= totalmass;
  // avy /= totalmass;
  // cm_history.push({ x: avx, y: avy });

  // fill(0, 0, 20);
  // cm_history.forEach((h) => {
  //   ellipse(h.x, h.y, 2, 2);
  // });

  textSize(20);
  fill(255);
  text("click to reset", 10, 22);
}
