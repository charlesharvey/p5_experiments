
let video;

function setup() {


    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();



}



// https://teachablemachine.withgoogle.com/

function draw() {
    background(0);

    image(video, 0, 0, video.width, video.height);


    let r = random();
    if (r > 0.99) {
        text(' I see Moose', 10, 10);
    } else if (r > 0.98) {
        text(' I see Puppy', 10, 10);
    } else {
        text('I see nothing yet', 10, 10);
    }



}
