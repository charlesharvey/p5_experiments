

var branches = [];

var stump;
var scl = 1;

function setup() {


    createCanvas(800, 800);


    branches.push(new Branch(width / 2, height / 2, PI));

}



function draw() {

    background(255);


    // scale(scl);
    // scl *= 0.999;


    for (let i = branches.length - 1; i >= 0; i--) {
        const branch = branches[i];
        branch.show();

    }




    loadPixels();

    for (let i = branches.length - 1; i >= 0; i--) {
        const branch = branches[i];

        if (branch.shouldGrow) {

            if (branch.length > branch.maxLength) {
                branch.shouldGrow = false;
                const lc = branch.createLeftChild();
                const rc = branch.createRightChild();
                branches.push(lc);
                branches.push(rc);

                //  branches.splice(i, 1);
            } else {


                branch.intersectsPixels(pixels);
                branch.update();
            }


        } else {

        }


    }


    // for (let i = branches.length - 1; i >= 0; i--) {
    //     const branch = branches[i];

    //     if (branch.hasCrashed) {
    //         branches.splice(i, 1);
    //     }
    // };

    // console.log(branches.length);


    if (branches.length > 1700) {

        noLoop();
    }
    // noLoop();




}
