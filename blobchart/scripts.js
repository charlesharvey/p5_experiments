

const blobs = [];


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);


    for (let i = 0; i < 10; i++) {
        const b = new Blob(random(30, 500));
        blobs.push(b);


    }

}



function draw() {
    background(0);


    blobs.forEach(blob => {
        blob.calcVertices();
        blob.show();
    })

}
