


let spirals;
const maxSpirals = 50;
const saturation = 0;  // 0 -> 255


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB, 255, 255, 255, 255);

    spirals = [];
    // for (let i = 0; i < 10; i++) {}
    addSpiral();


}



function addSpiral() {
    spirals.push(new Spiral());
}


function draw() {
    background(0);


    spirals.forEach(spiral => {

        // if (frameCount % 3 == 0) {
        spiral.update();
        // }

        spiral.show();
    });



    if (frameCount % 10 == 0) {
        if (spirals.length < maxSpirals) {
            addSpiral();
        }
    }

}
