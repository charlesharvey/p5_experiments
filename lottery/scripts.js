

const start = new Date().valueOf();

const totalBalls = 49;
const numberToChoose = 6;
const chanceWinning = chanceOfWinning(numberToChoose, totalBalls);



let hasWon = false;
let ballsMatching = 0;
let timesrun = 0;

let choice;

let drawing = false;


function setup() {


    createCanvas(600, 400);



    // returns array of random balls
    choice = randomChoice(numberToChoose, totalBalls);



}


const ballWidth = 80;

function draw() {
    background(0);


    textSize(26);

    if (choice) {


        for (let i = 0; i < choice.length; i++) {
            const ball = choice[i];
            push();
            translate(i * (ballWidth + 10) + ballWidth, ballWidth);

            fill(255, 0, 0);
            ellipse(0, 0, ballWidth, ballWidth);
            fill(255, 255, 255);
            text(ball, -ballWidth / 4, 0);
            pop();
        }
    }


    if (!drawing) {
        drawing = true;
        startDraw();
    }


}



function startDraw() {



    console.log('your numbers are: ', choice);

    // while (numberToChoose !== ballsMatching) {
    while (hasWon === false) {

        //  ballsMatching = 0;
        hasWon = true;

        timesrun++;




        // what is the lottery balls
        const result = randomChoice(numberToChoose, totalBalls);


        // calculate if won lottery
        for (let i = 0; i < numberToChoose; i++) {
            const ball = result[i];
            if (!choice.includes(ball)) {
                hasWon = false;
                break;
            }
        }

        // this way of caculating if won is twice as slow
        // choice.forEach(ball => {
        //     if (!result.includes(ball)) {
        //         ballsMatching++;
        //     }
        // });
        // if (ballsMatching === numberToChoose) {

        if (hasWon) {
            const end = new Date().valueOf();
            const timetaken = end - start;
            const avperrun = timesrun / timetaken;
            console.log('won! after', timesrun, 'tries');
            console.log(timesrun, 'weeks is ', Math.round(timesrun / 52 / 1000), 'millenia');
            console.log(result);
            console.log('you had a 1 in ', chanceWinning, ' of winning');
            console.log('runs per ms:', avperrun, timetaken);
        }


        if (timesrun % 1000000 === 0) {
            console.log('times run:', timesrun / 1000000, 'million');
        }


    }


}


function randomChoice(n, t) {
    const c = [];
    while (c.length < n) {
        const ra = Math.floor(Math.random() * (t)) + 1;

        if (!c.includes(ra)) {
            c.push(ra);
        }
    }
    return c;
}



function chanceOfWinning(n, t) {
    return Math.round(factorial(t) / (factorial(n) * factorial(t - n)));
}


function factorial(num) {
    if (num === 0) { return 1; }
    else { return num * factorial(num - 1); }
}


