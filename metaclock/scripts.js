

let clocks = [];
let i = 0;

function setup() {


    createCanvas(900, 400);


    const r = 50;

    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 3; j++) {
            const six = i % 2 + j + j;
            const hand = Math.floor(i / 2);
            const clock = new Clock((r + 10) * i + r, (r + 10) * j + r - 10, r, six, hand);
            clocks.push(clock);

        }
    }


}



function draw() {
    background(0);
    // frameRate(1);



    const seconds = new Date().getSeconds();
    const minutes = new Date().getMinutes();
    const hours = new Date().getHours();

    clocks.forEach(clock => {
        clock.show();

        if (clock.hand == 5) {
            clock.updateClock(seconds % 10);
        } else if (clock.hand == 4) {
            clock.updateClock(Math.floor(seconds / 10));
        } else if (clock.hand == 3) {
            clock.updateClock(minutes % 10);
        } else if (clock.hand == 2) {
            clock.updateClock(Math.floor(minutes / 10));
        } else if (clock.hand == 1) {
            clock.updateClock(hours % 10);
        } else {
            clock.updateClock(Math.floor(hours / 10));
        }


    })



    strokeWeight(1);
    text(hours, 20, 350);
    text(minutes, 50, 350);
    text(seconds, 80, 350);
    text(Math.round(frameRate()) + 'fps', 110, 350);




}
