

let circles;
const number = 100;
const r = 100;
let theta = 0;

function setup() {


    createCanvas(500, 500);




}


function makeCircles() {
    circles = [];
    const df = TWO_PI / number;

    for (let i = 0; i < TWO_PI; i += df) {
        const x = sin(i + theta) * r + (width / 2);
        const y = cos(i - theta / 2) * r + (width / 2);
        const circle = new Circle(x, y, r);
        circles.push(circle);
    }
}


function draw() {
    background(0);



    makeCircles();


    circles.forEach(circle => {
        circle.show();
    })


    theta += 0.01;

}
