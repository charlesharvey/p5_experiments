

let points = [];


let range;
let detail;
let w, h;
function setup() {


    createCanvas(300, 300);

    w = width;
    h = height;

    detail = 1;
    range = 10;




    colorMode(HSB, 255, 255, 255);





}



function draw() {
    // background(0);

    points = [];
    for (let x = 0; x < w; x += detail) {
        for (let y = 0; y < h; y += detail) {

            const xx = map(x, 0, w, -range, range);
            const yy = map(y, 0, h, -range, range);
            points.push(new Point(x, y, xx, yy));
        }
    }


    loadPixels();


    points.forEach((point, i) => {
        // if (i % 177 === 0) {
        //     console.log(point.output.heading(), point.output.mag());
        // }


        const h = map(point.output.heading(), -3.14159, 3.14159, 0, 255);
        const l = map(point.output.mag(), 0, 4, 0, 255);
        const c = color(h, 255, l);
        set(point.x, point.y, c);
    })


    updatePixels();

    range = range * 0.95;
    // noLoop();
    // console.log(frameRate());
    if (range < 1) {
        noLoop();
    }

}
