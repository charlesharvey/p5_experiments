

let GREEN, RED, GREY;
const gateTypes = ['AND', 'OR', 'XOR', 'NOT', 'SWITCH'];
let chips;
let wires;
let powerrails;
let curX, curY, x1, y1, x2, y2, dx, dy;



let wantingToToggle = false;
let wireToDraw;

function setup() {

    createCanvas(windowWidth - 20, windowHeight - 70);
    textAlign(CENTER);
    colorMode(HSB);

    GREEN = color(100, 100, 100);
    RED = color(0, 100, 100);
    GREY = color(0, 0, 50);

    reset();

}



function mouseMoved() {
    curX = Math.floor(mouseX / 1);
    curY = Math.floor(mouseY / 1);


}


function mousePressed() {
    let noChipsSelected = true;
    chips.forEach(chip => {
        if (noChipsSelected) {
            chip.unselect();
            if (chip.highlighted) {
                chip.select();
                x1 = mouseX;
                y1 = mouseY;
                noChipsSelected = false;

                chip.toggleActivated();
            }
        }
    });

    if (noChipsSelected) {
        // draw a wire
        x1 = mouseX;
        y1 = mouseY;
        x2 = mouseX;
        y2 = mouseY;
        wireToDraw = { x1, y1, x2, y2 };
    }
}


function mouseDragged() {
    x2 = mouseX;
    y2 = mouseY;

    dx = x2 - x1; //  Math.round((x2 - x1) / 1);
    dy = y2 - y1; //  Math.round((y2 - y1) / 1);

    chips.forEach(chip => {
        if (chip.selected) {
            chip.moveTo(dx, dy)

        }
    });

    if (wireToDraw) {
        wireToDraw.x2 = x2;
        wireToDraw.y2 = y2;
    }

}

function mouseReleased() {
    chips.forEach(chip => {
        if (chip.selected) {
            chip.unselect();
        }
    });


    wires.forEach(w => w.setPositions());


    addNewWireIfNeccessary();


    x1 = null;
    y1 = null;
    x2 = null;
    y2 = null;
}


function addNewWireIfNeccessary() {

    if (wireToDraw) {
        let recordab = 9999999;
        let recordo = 9999999;
        let whichab = null;
        let startchip;
        let endchip;

        chips.forEach(chip => {
            const dista = chip.distA(wireToDraw.x2, wireToDraw.y2);
            const distb = chip.distB(wireToDraw.x2, wireToDraw.y2);
            const disto = chip.distO(wireToDraw.x1, wireToDraw.y1);
            if (dista < recordab && dista < 50) {
                recordab = dista;
                endchip = chip;
                whichab = 'A';
            }
            if (distb < recordab && distb < 50) {
                recordab = distb;
                endchip = chip;
                whichab = 'B';
            }
            if (disto < recordo && disto < 50) {
                recordo = disto;
                startchip = chip;
            }
        });
        if (endchip && whichab) {

            if (startchip) {
                const existingwire = wires.find(w => {
                    return w.chipb == endchip &&
                        w.posa == 'O' &&
                        w.posb == whichab;
                });
                if (!existingwire) {
                    const newwire = new Wire(startchip, 'O', endchip, whichab);
                    wires.push(newwire);
                }
            } else {
                // NOT CONNECTING TO CHIP.
                // MAYBE CONNECTING TO POWER RAIL
                const distpositive = Math.abs(powerrails[0].y - wireToDraw.y1);
                const distnegative = Math.abs(powerrails[1].y - wireToDraw.y1);

                if (distpositive < 30) {
                    const newwire = new Wire(null, null, endchip, whichab, powerrails[0], wireToDraw.x1);
                    wires.push(newwire);
                } else if (distnegative < 30) {
                    const newwire = new Wire(null, null, endchip, whichab, powerrails[1], wireToDraw.x1);
                    wires.push(newwire);
                }
            } // if no startchip
        } // end if have endchip

    }
    wireToDraw = null;
}


function reset() {

    chips = [];
    wires = [];
    powerrails = [];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {

            const t = gateTypes[(i + j * 3) % gateTypes.length];
            const x = 350 * (i + 0.5);
            const y = 200 * (j + 0.5)
            const chip = new Chip(t, x, y);
            chips.push(chip);
        }
    }

    powerrails.push(new Powerrail(1));
    powerrails.push(new Powerrail(0));


    // wires.push(new Wire(chips[0], 'O', chips[3], 'A'));
    // wires.push(new Wire(chips[1], 'O', chips[3], 'B'));
    // wires.push(new Wire(chips[2], 'O', chips[4], 'A'));
    // wires.push(new Wire(chips[2], 'O', chips[4], 'B'));
    // wires.push(new Wire(chips[4], 'O', chips[7], 'B'));
    // wires.push(new Wire(chips[5], 'O', chips[8], 'B'));
    // wires.push(new Wire(chips[3], 'O', chips[6], 'A'));
    // wires.push(new Wire(chips[3], 'O', chips[6], 'B'));
    // wires.push(new Wire(chips[6], 'O', chips[7], 'A'));

}


function draw() {
    background(0);



    chips.forEach(chip => {
        chip.highlight(curX, curY);
        chip.show();



    });

    wires.forEach(wire => {
        wire.update();
        wire.show();
    })



    powerrails.forEach(powerrail => {
        powerrail.show();
    })






    if (wireToDraw) {
        stroke(255);
        strokeWeight(1);
        line(wireToDraw.x1, wireToDraw.y1, wireToDraw.x2, wireToDraw.y2)
    }

    // frameRate(1);
    // noLoop();

}
