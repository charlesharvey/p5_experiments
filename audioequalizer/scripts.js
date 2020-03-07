
let audioContext = new AudioContext();
let source, script_processor_node, gain_node;
const BUFF_SIZE = 256;
let values = [];

let grid;

const bar_number = 52;
let bar_values = []
let bar_grid;

// let audio = document.querySelector('audio');




if (!navigator.getUserMedia) navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;



function startAudio() {
    if (navigator.getUserMedia) {

        navigator.getUserMedia({ audio: true },
            function (stream) {
                start_microphone(stream);
            },
            function (e) {
                alert('Error capturing audio.');
            }
        );

    } else {
        alert('getUserMedia not supported in this browser.');
    }


}

function start_microphone(stream) {


    microphone_stream = audioContext.createMediaStreamSource(stream);
    console.log(stream, microphone_stream);


    // play the audio
    gain_node = audioContext.createGain();
    gain_node.connect(audioContext.destination);
    gain_node.gain.value = 200;


    // microphone_stream.connect(gain_node);



    script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);

    script_processor_node.onaudioprocess = process_microphone_buffer;

    microphone_stream.connect(script_processor_node);



}

function process_microphone_buffer(event) {
    let i, N, inp, microphone_output_buffer;

    microphone_output_buffer = event.inputBuffer.getChannelData(0); // just mono - 1 channel for now
    values = microphone_output_buffer;
}




function setup() {


    createCanvas(600, 400);

    startAudio();

    bar_grid = width / bar_number;
    grid = width / BUFF_SIZE;




}

function resetBarValues() {
    bar_values = [];
    while (bar_values.length < bar_number) {
        bar_values.push(0);
    }
}



function draw() {
    background(0);

    fill(255, 0, 0);
    noStroke();

    resetBarValues();
    const nob = floor(BUFF_SIZE / bar_number) + 1;
    values.forEach((value, i) => {
        const ind = floor(i / BUFF_SIZE * bar_number);
        bar_values[ind] += bar_values[ind] + (value / nob);
    });
    bar_values.forEach((value, i) => {
        const x = i * bar_grid;
        const y = ((value) * (height)) + 10;
        rect(x, height, bar_grid - 5, -y);
    });


    fill(255);
    strokeWeight(1);
    stroke(125);

    beginShape(LINES);
    values.forEach((value, i) => {
        const x = i * grid;
        const y = (value * (height)) + height / 2;
        vertex(x, y)
        // ellipse(x, y, grid, grid);
    });
    endShape();


    frameRate(30);

}
