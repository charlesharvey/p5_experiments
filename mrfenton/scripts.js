

class Fenton {

    constructor() {
        this.x = random(width)
        this.y = random(-200, -100);
        this.theta = random(0, TWO_PI);
        this.speed = random(0.5, 3);
        this.wobbliness = random(0.1, 5);
    }

    update() {
        this.theta += 0.1;
        this.y += this.speed;
        this.x += sin(this.theta) * this.wobbliness;
    }


    show() {
        push();
        translate(this.x, this.y);
        fill(255);
        noStroke();
        // rect(0, 0, 50, 50 * (298 / 210));


        // 210x298
        image(fentonimage, 0, 0, 50, 50 * (298 / 210));
        pop();

    }

    offscreen() {
        return (this.y > height);
    }

}

let fentons;
let fentonimage;
let numberoffentons;
function preload() {
    fentonimage = loadImage('fenton.png');

}


function createFenton() {
    fentons.push(new Fenton());
}

function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);

    reset();
}


function mouseClicked() {
    reset();
}

function reset() {
    fentons = [];
    numberoffentons = Math.floor(width / 20);


    for (let i = 0; i < numberoffentons; i++) {
        createFenton();
    }



}


function draw() {
    background(0);

    image(fentonimage, 0, 0, width, height);

    background(0, 200);

    fentons.forEach((f, i) => {

        f.show();
        f.update();
        if (f.offscreen()) {
            fentons.splice(i, 1);

            createFenton();
        }
    });


    // if (frameRate() > 30) {
    //     createFenton();
    // }




}
