


let seed = 0;
let ripples = [];
let isWEBGL;


class Ripple {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = 0;
        this.color = color;
        this.speed = random(1, 7);
        this.opacity = 200;
    }


    show() {
        strokeWeight(2);
        stroke(this.color, this.opacity);
        noFill();
        ellipse(this.x, this.y, this.size, this.size);

    }

    update() {
        this.size += (this.speed / 4);
        this.opacity = map(this.size, 0, 600, 200, 0);
    }

    dead() {
        return (this.size > 600);
    }
}


function setup() {

    isWEBGL = false;

    if (isWEBGL) {
        createCanvas(600, 600, WEBGL);

    } else {
        createCanvas(600, 600);

    }



}



function draw() {
    background(0);
    if (isWEBGL) {
        rotateX(1);
        translate(-300, -150);

    }




    for (let i = ripples.length - 1; i >= 0; i--) {

        const ripple = ripples[i];
        ripple.show();
        ripple.update();

        if (ripple.dead()) {
            ripples.splice(i, 1);
        }

    }


    if (Math.random() > 0.85) {
        let n = noise(seed);
        const color = map(n, 0, 1, 0, 255);
        let x = width / 2;
        let y = height / 2;
        let newripple = new Ripple(x, y, color);
        ripples.push(newripple);

        seed += 0.1;

    }




}
