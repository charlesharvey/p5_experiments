

let circles;
const number = 100;
let r = 200;
let theta = 0;
let speed = 0.02;
let hue;
function setup() {


    createCanvas(windowWidth - 10, windowHeight - 10);
    colorMode(HSB, 255, 255, 255);

    r = min(width, height) / 4;

    hue = 0;

}


function makeCircles() {
    circles = [];
    const df = TWO_PI / number;
    for (let i = 0; i < TWO_PI; i += df) {
        const x = sin(i + theta) * r; // + (width / 4);
        const y = cos(i - theta / 2) * r; // + (width / 4);
        const circle = new Circle(x, y, r);
        circles.push(circle);
    }
}


function draw() {
    background(0);

    translate(width / 2, height / 2);

    makeCircles();


    circles.forEach(circle => {
        circle.show();
    })


    theta += speed;
    hue = hue + 0.25 % 255;
}
