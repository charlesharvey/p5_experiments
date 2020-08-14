

let GREEN, RED, GREY;
const gateTypes = ['NOR', 'XOR', 'SWITCH', 'CLOCK', 'OR', 'AND', 'NAND', 'NOT']
let chips;
let wires;
let powerrails;
let curX, curY, x1, y1, x2, y2, dx, dy;

let size = 50;

let showAdder = false;
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


function removeWire() {
    // if drawing line through wire, see if center poitns are 50 pixels or less away. if so delete
    let cx = (wireToDraw.x1 + wireToDraw.x2) / 2;
    let cy = (wireToDraw.y1 + wireToDraw.y2) / 2;

    for (let i = wires.length - 1; i >= 0; i--) {
        const wire = wires[i];
        let wire_cx = (wire.x1 + wire.x2) / 2;
        let wire_cy = (wire.y1 + wire.y2) / 2;
        const d = dist(cx, cy, wire_cx, wire_cy);
        if (d < 50) {
            wire.resetChips();
            wires.splice(i, 1);
        }

    }


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
        } else {// end if have endchip
            removeWire();
        }

    }
    wireToDraw = null;
}


function reset() {

    powerrails = [];
    powerrails.push(new Powerrail(1));
    powerrails.push(new Powerrail(0));


    makeChips();



}


function keyPressed() {
    if (key == ' ') {
        showAdder = !showAdder;

        if (showAdder) {
            makeAdders();
        } else {
            makeChips();
        }
    }
}

function makeChips() {


    size = 50;

    chips = [];
    wires = [];


    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
            const t = gateTypes[(i + j * 3) % gateTypes.length];
            const x = 200 * (i + 0.5);
            const y = 170 * (j + 0.5)
            const chip = new Chip(t, x, y);
            chips.push(chip);
        }
    }

}

function makeAdders() {
    size = 28;
    chips = [];
    wires = [];


    makeAdder(80);
    makeAdder(600);
}


function makeAdder(xoff) {

    const c0 = new Chip('XOR', xoff + (size * 4), 200); // 0
    chips.push(c0);
    const c1 = new Chip('NAND', xoff + (size * 4), 300); // 1
    chips.push(c1);
    const c2 = new Chip('NAND', xoff + (size * 7), 125); // 2
    chips.push(c2);
    const c3 = new Chip('NOT', xoff + (size * 7), 250); // 3
    chips.push(c3);
    const c4 = new Chip('NOT', xoff + (size * 9), 175); // 4
    chips.push(c4);
    const c5 = new Chip('NOR', xoff + (size * 11), 275); // 5
    chips.push(c5);
    const c6 = new Chip('NOT', xoff + (size * 13), 200); // 6
    chips.push(c6);
    const c7 = new Chip('XOR', xoff + (size * 13), 75); // 7
    chips.push(c7);
    const c8 = new Chip('SWITCH', xoff + (size * 0), 200); // 8
    chips.push(c8);
    const c9 = new Chip('SWITCH', xoff + (size * 0), 300); // 9
    chips.push(c9);
    const c10 = new Chip('SWITCH', xoff + (size * 0), 100); // 9
    chips.push(c10);

    wires.push(new Wire(c0, 'O', c7, 'B'));
    wires.push(new Wire(c0, 'O', c2, 'B'));
    wires.push(new Wire(c1, 'O', c3, 'A'));
    wires.push(new Wire(c3, 'O', c5, 'B'));
    wires.push(new Wire(c2, 'O', c4, 'A'));
    wires.push(new Wire(c4, 'O', c5, 'A'));
    wires.push(new Wire(c5, 'O', c6, 'A'));
    wires.push(new Wire(c8, 'O', c0, 'A'));
    wires.push(new Wire(c8, 'O', c1, 'A'));
    wires.push(new Wire(c9, 'O', c0, 'B'));
    wires.push(new Wire(c9, 'O', c1, 'B'));
    wires.push(new Wire(c10, 'O', c2, 'A'));
    wires.push(new Wire(c10, 'O', c7, 'A'));

    wires.push(new Wire(null, null, c8, 'A', powerrails[0], c8.x - 30));
    wires.push(new Wire(null, null, c9, 'A', powerrails[0], c8.x - 60));

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


    if (frameCount % 20 == 0) {
        chips.filter(c => c.type === 'CLOCK').forEach(c => {
            // const d = new Date();
            // const s = d.getSeconds();
            // this.o = (s % 2 == 0) ? 1 : 0;
            c.tick();
        })

    }




    if (wireToDraw) {
        stroke(255);
        strokeWeight(1);
        line(wireToDraw.x1, wireToDraw.y1, wireToDraw.x2, wireToDraw.y2)
    }

    // frameRate(1);
    // noLoop();

}
