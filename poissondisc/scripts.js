
let grid = 80;
let k = 30; // attempts to draw a disc
let d = grid / Math.sqrt(2); // 

let rows, cols;

let points = [];
let activelist = [];

function setup() {



    createCanvas(windowWidth - 20, windowHeight - 20);


    rows = Math.floor(width / grid);
    cols = Math.floor(height / grid);


    for (let i = 0; i < rows * cols; i++) {
        points[i] = null;

    }

}



function draw() {
    background(0);


    if (activelist.length == 0) {

        const randompoint = createVector(random(width), random(height));
        activelist.push(randompoint);


    }


    activelist.forEach(pt => {



        // const ac_col = Math.floor(pt.x / grid);
        // const ac_row = Math.floor(pt.y / grid);
        // console.log(ac_col, ac_row);


        ellipse(pt.x, pt.y, 5, 5);



    })





    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {


            stroke(30);
            line(0, c * grid, width, c * grid);
            line(r * grid, 0, r * grid, height);


            const ind = r + c * cols;
            if (points[ind] == null) {
                // if disc not in cell


                activelist.forEach((active_point, i) => {


                    const dd = dist(active_point.x, active_point.y, 0, 0);
                    if (dd < d) {
                        points[ind] = active_point;


                        activelist.splice(i, 1);
                    }



                })





                //ellipse(r * grid, c * grid, grid / 2, grid / 2);
            }

        }
    }


    // noLoop();
    // frameRate(1);

    points.forEach(pt => {
        if (pt) {
            ellipse(pt.x, pt.y, 5, 5);
        }

    });


}
