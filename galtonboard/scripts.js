
let balls = []
let pegs = [];
let gridsize = 13;
let gridsizeX = 9;
let gridsizeY = 18;
let numberofpegs = 20;
let numberofballs = 200;

let results = [];
let deadballs = 0;


function setup() {


    createCanvas(600, 700);

    addPegs();
    addBalls();
    startResults();

}


function startResults() {
    results = []
    for (let i = 0; i < numberofpegs * 2 + 1; i++) {
        results.push({ x: i, total: 0 });
    }
}


function addBalls() {
    balls = [];
    for (let i = 0; i < numberofballs; i++) {
        let r = random(numberofballs * -1, 0);
        balls.push(new Ball(numberofpegs, r));

    };
}


function addPegs() {


    pegs = [];
    pegs.push(new Peg(numberofpegs, 0));

    for (let i = 0; i < numberofpegs - 1; i++) {
        let kidstoadd = []
        pegs.forEach(peg => {
            if (peg.y == i) {
                let children = peg.createChildren(kidstoadd);

                children.forEach(c => kidstoadd.push(c));

            }

        });

        kidstoadd.forEach(k => {
            pegs.push(k);
        })
    }



}


function draw() {


    if (deadballs == numberofballs) {
        noLoop();
    }


    background(255);




    translate(30, 100);

    results.forEach(result => {

        // fill(230);
        // rect(result.x * gridsizeX - 2.5, numberofpegs * gridsizeY * 2.3, 5, -100);
        fill(255, 0, 0);
        rect(result.x * gridsizeX - 2.5, height - 200, 5, result.total * 5 * -1);




    });


    pegs.forEach(peg => {
        peg.draw();
    })

    balls.forEach(ball => {



        if (ball.canMove) {
            ball.draw();
            ball.update(pegs);
            if (ball.finished()) {
                ball.stop();
                deadballs++;
                const r = results.find(d => d.x == ball.x);
                if (r) {
                    r.total++;
                }

            }
        }
    })








}
