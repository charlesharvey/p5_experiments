

class Julian {

    constructor() {

        const x = random(width)
        const y = random(-200, -100);
        const speed = random(1, 6);
        this.pos = createVector(x, y);
        this.vel = createVector(0, speed);
        this.acc = createVector(0, 0);


        this.hovered = false;

        this.width = random(30, 110);
        this.height = this.width * (147 / 100)
    }



    applyForce(force) {
        this.acc.add(force);
    }

    update() {



        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(13);
        this.acc.mult(0); // createVector(0, 0);

    }


    attracted(target, repelDistance) {
        const force = p5.Vector.sub(target, this.pos);
        let dir2 = force.magSq(); // square the distance between the target and current position;
        dir2 = constrain(dir2, 0, 1000);
        const g = 3.987;
        const strength = g / dir2;
        force.setMag(strength);

        const d = dist(target.x, target.y, this.pos.x, this.pos.y);
        if (d < repelDistance) {
            force.mult(-100);
        } else {
            force.mult(6);
        }

        this.applyForce(force);
        // this.acc = force.copy();
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);


        if (useImage) {
            if (this.hovered) {
                image(julianimagehands, 0, 0, this.width, this.height);
            } else {
                image(julianimage, 0, 0, this.width, this.height);
            }

        } else {
            fill(255);
            noStroke();
            rect(0, 0, this.width, this.height);
        }

        pop();

    }

    offscreen() {
        return ((this.pos.y > height) || (this.pos.x > (width + this.width)) || (this.pos.x < (0 - this.width)));
    }

}

let useImage = true;
let target;
let julianes;
let julianimage;
let julianimagehands;
let numberofjulianes;
let colorangle = 0;
function preload() {
    if (useImage) {
        julianimage = loadImage('devil-2.png');
        julianimagehands = loadImage('devil-2.png');

    }

}


function createJulian() {
    julianes.push(new Julian());
}

function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);

    reset();
}


function mouseMoved() {
    if (target) {
        target.x = mouseX;
        target.y = mouseY;
    }

    if (julianes) {

        julianes.forEach((j, i) => {
            const d = dist(j.pos.x, j.pos.y, target.x, target.y);
            if (j.hovered === false) {
                j.hovered = d < 100;
            }

        });
    }


}



function mouseClicked() {
    reset();
}

function reset() {
    target = createVector(width / 2, height / 2);
    julianes = [];
    numberofjulianes = Math.floor(width / 20);
    for (let i = 0; i < numberofjulianes; i++) {
        createJulian();
    }
}


function draw() {
    colorMode(HSB);
    const b = map(sin(colorangle), -1, 1, 0, 255);
    background(b, 120, 60);



    // image(julianimage, 0, 0, width, height);

    // background(0, 200);

    julianes.forEach((f, i) => {

        f.show();
        f.attracted(target, width / 9);

        f.update();
        if (f.offscreen()) {
            julianes.splice(i, 1);

        }
    });


    if (julianes.length < numberofjulianes) {
        createJulian();
    }

    // if (frameRate() > 30) {
    //     createJulian();
    // }




    colorangle += 0.005;

}
