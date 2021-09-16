

let splines;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    splines = [];
    for (let i = 0; i < 10; i++) {
        splines.push(new Spline(i / 10));

    }


}



function draw() {
    background(0);


    splines.forEach(spline => {
        spline.update();
        spline.show();
    });

}
