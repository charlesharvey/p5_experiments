
const useWebcam = false;

let bird;
let main;
let capture;
let webcampic;

function preload() {
    if (!useWebcam) {
        bird = loadImage('bird.jpg');
    }
}
function setup() {


    createCanvas(600, 600);
    colorMode(HSB);
    noFill();


    if (useWebcam) {
        let constraints = {
            video: {
                mandatory: {
                    minWidth: 300,
                    minHeight: 300
                },
                optional: [{ maxFrameRate: 2 }]
            },
            audio: false
        };

        capture = createCapture(constraints);
        capture.hide();

    } else {

        main = new Quad(0, 0, 0, 0, bird);
    }


}


function reset() {
    setTimeout(() => {
        if (useWebcam) {
            main = null;
            bird = null;
        } else {
            main = new Quad(0, 0, 0, 0, bird);
        }
    }, 6000);

}

function mousePressed() {
    if (main) {
        main.splitIntoFour();
    } else {
        if (useWebcam) {

            bird = capture.get(0, 0, 300, 300);
            main = new Quad(0, 0, 0, 0, bird);

        }
    }
}



function draw() {
    background(0);



    if (main) {

        main.update();
        main.show();

        if (main.finished()) {
            reset();
        }
    }



    if (bird) {
        image(bird, 300, 0);
    } else {
        if (useWebcam) {
            webcampic = capture.get(0, 0, 300, 300);
            image(webcampic, 300, 0);

        }

    }




}
