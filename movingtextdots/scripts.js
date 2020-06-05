

const useIndividualLetters = false;
const drawLinesOrPoints = 'lines';

let font;
let points;
let dots;
let target;


const fontsize = 200;
const offsettomakecenter = 40;
const x_off = 150;
const y_off = 250;

const letterPoints = []; // library of all points for each letter


const fancyletters = [];



function preload() {
    font = loadFont('cera.ttf');
}


function reset() {
    target = null;
    dots = []
}



function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    if (useIndividualLetters) {
        setupIndividualLetters();
    } else {
        setupAllOneWords();
    }


}




function draw() {

    background(0);

    if (useIndividualLetters) {
        drawIndividualLetters();
    } else {
        drawAllOneWord();
    }



}



function setupAllOneWords() {
    reset();


    // points = font.textToPoints('webfactor', x_off, y_off, fontsize, {
    //     sampleFactor: 0.0701
    // });
    // points2 = font.textToPoints('is cool', x_off  + offsettomakecenter, y_off, fontsize, {
    //     sampleFactor: 0.1243
    // });
    points = font.textToPoints('charles', x_off, y_off, fontsize, {
        sampleFactor: 0.0976
    });
    points2 = font.textToPoints('is cool', x_off + offsettomakecenter, y_off, fontsize, {
        sampleFactor: 0.123
    });


    // points2 = shuffle(points2);

    for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const dot = new Dot(pt.x, pt.y);
        if (points2[i]) {
            const pt2 = points2[i];
            dot.addFrame(pt2.x, pt2.y)
        } else { // set as the last
            const pt2 = points2[points2.length - 1];
            dot.addFrame(pt2.x, pt2.y)
        }
        dots.push(dot);
    }
}


function createLetterPoint(letter) {

    const newletterpoints = font.textToPoints(letter, 0, 0, fontsize, {
        sampleFactor: 0.1
    });
    letterPoints.push({ letter: letter, points: newletterpoints });
}


function setupIndividualLetters() {

    const neededLetters = ['c', 'h', 'a', 'r', 'l', 'e', 's', 'i', 'o'];

    neededLetters.forEach(letter => {
        createLetterPoint(letter);
    });



    const wordtomake = 'charles';


    for (let i = 0; i < wordtomake.length; i++) {
        const letter = wordtomake.charAt(i);

        const pts = letterPoints.find(lp => lp.letter == letter).points;


        console.log(letter, pts);

        const dts = [];
        console.log(pts);
        pts.forEach(pt => {
            const dot = new Dot(pt.x, pt.y);
            dts.push(dot);
        })

        const gap = 100;
        const fl = new Fancyletter(x_off + i * gap, y_off, dts);
        fancyletters.push(fl);



    }




}


function drawIndividualLetters() {

    fancyletters.forEach(fancyletter => {
        fancyletter.show();
    })

}

function drawAllOneWord() {

    if (drawLinesOrPoints == 'lines') {
        stroke(255);
        noFill();
        beginShape();
    }


    dots.forEach(dot => {
        if (target) {
            dot.avoid(target);
        }

        dot.moveTo(dot.home);
        dot.update();

        if (drawLinesOrPoints == 'lines') {
            vertex(dot.pos.x, dot.pos.y);
        } else {
            dot.show();
        }


    });


    if (drawLinesOrPoints == 'lines') {
        endShape();
    }

    if (frameCount % 150 == 0) {
        dots.forEach(dot => {
            dot.moveToNextFrame();
        });
    }


}

function mouseMoved() {
    if (!target) {
        target = createVector(mouseX, mouseY)
    } else {
        target.x = mouseX;
        target.y = mouseY;
    }

}
