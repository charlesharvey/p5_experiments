

let blocks;
const number_of_blocks = 15;
let is_sorted = false;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    colorMode(HSB);


    reset();
}

function reset() {
    console.log('resetting');

    blocks = [];

    let positions = [];
    for (let i = 0; i < number_of_blocks; i++) {
        positions.push(i);
    }
    positions = shuffle(positions);


    for (let i = 0; i < number_of_blocks; i++) {
        const position = positions[i];
        const block = new Block(i, position);
        blocks.push(block);
    }
}





function quicksort() {

    this.checkIsSorted();



    if (is_sorted) {
        // reset();
        noLoop();
    } else {

        const pivotPos = Math.floor(Math.random() * number_of_blocks);
        const pivot = blocks.find(b => b.position === pivotPos);
        if (pivot) {
            blocks.forEach(b => {
                b.setPivotInformation(pivot.position, pivot.index);
            });


            const lowers = blocks.filter(b => b.is_lower);
            const uppers = blocks.filter(b => b.is_upper);

            let startpos = 0;
            uppers.forEach((b, i) => {
                b.position = startpos;
                startpos++;
            });

            startpos = pivot.position + 1;
            lowers.forEach((b, i) => {
                b.position = startpos;
                startpos++;
            })


            blocks = blocks.sort((a, b) => {
                if (a.position < b.position) {
                    return 1;
                }
                return -1;
            });

            blocks.forEach((b, i) => {
                b.setPosition(i);
            })




            // new_blocks = lowers.concat(pivot).concat(uppers);
            // console.log(new_blocks);

            // new_blocks.forEach((nb, i) => {
            //     nb.setPosition(i);
            // })
            // blocks = new_blocks;
        }



    }



}



function checkIsSorted() {
    let all_are_sorted = true;
    blocks.forEach((b, i) => {
        if (b.position !== b.index) {
            all_are_sorted = false;
        }
    })
    is_sorted = all_are_sorted;
}

function mousePressed() {
    reset();
}


function draw() {
    background(0);

    blocks.forEach(block => {
        block.show();
    });


    // if (frameCount % 10 === 0) {
    quicksort();

    // }

    frameRate(3);





}
