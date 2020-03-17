
let data = [
    66,
    84,
    102,
    129,
    157,
    171,
    184,
    188,
    229,
    258,
    278,
    330,
    354,
    382,
    461,
    517,
    522,
    586,
    608,
    697,
    781,
    896,
    999,
    1150,
    1257,
    1527,
    1837,
    2411,
    2493,
    2936,
    3670,
    4546,
    5965,
    7161,
    9047,
    10785,
    12888,
    15029,
    17817,
    21522,
    25470,
    29306,
    32985,
    38439,
    45204,
    53955,
    64808,
    76099,
    88745,
    101728
];

let infections = [];
let visibleInfections = [];

let logarithmic = true;
let border = 40;
let h, w;
let maxInfection;


let growthchartwidth = 200;
let growthchartheight = 100;



function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    w = width - border * 2;
    h = height - border * 2;


    data.forEach((datum, i) => {
        infections.push(new Infection(datum, i));
    })

    for (let i = 1; i < infections.length; i++) {
        const infection = infections[i];
        const prev = infections[i - 1];
        infection.setPrev(prev);

    }




    calculateMaxInfection();

}


function mousePressed() {
    logarithmic = !logarithmic;
    // resetInfections();
}

function mouseMoved() {


    let nearestDist = 99999999;
    let nearesti = null;
    infections.forEach((infection, index) => {
        infection.highlighted = false;
        const ny = infection.ypos();
        const nx = infection.xpos();
        const d = dist(nx, ny, mouseX, mouseY);
        if (d < nearestDist && d < 250) {
            nearestDist = d;
            nearesti = infection;
        }
    });
    if (nearesti) {
        nearesti.highlighted = true;
    }


}


function calculateMaxInfection() {

    const m = Math.floor(max(infections.map(i => i.amount)));
    const pow = m.toString().length;
    const ten = Math.pow(10, pow - 2);
    const mm = Math.ceil(m / ten) * ten;

    maxInfection = mm;
}


function addInfection() {
    const n = Math.ceil(infections[infections.length - 1] * 1.5);
    infections.push(n);
    calculateMaxInfection();

}

function addVisibleInfection() {
    const il = infections.length;
    const vl = infections.filter(i => i.visible).length;
    if (vl < il) {
        infections[vl].visible = true;
    } else {
        // noLoop();
    }
}

function resetInfections() {
    infections.map(i => i.visible = false);
}


function draw() {
    background(0);

    noFill();
    stroke(50);
    strokeWeight(1);
    rect(border, border, w, h);


    infections.forEach(infection => {
        infection.show();
    })





    noFill();
    stroke(255);
    strokeWeight(2);
    beginShape();
    infections.forEach((infection, index) => {
        if (infection.visible) {
            // let y = infection.ypos();
            // let x = infection.xpos();
            vertex(infection.pos.x, infection.pos.y);
        }

    });
    endShape();




    if (frameCount % 2 == 1) {
        addVisibleInfection();
    }

    // // ?frameRate(2);



    // graph of growth rates
    translate(border * 2, border * 2);
    stroke(100);
    strokeWeight(1);
    beginShape();
    let gx, gy, gr;
    infections.forEach((infection, index) => {
        if (infection.growth && infection.visible) {
            gr = infection.growth;
            gx = map(index, 0, infections.length - 1, 0, growthchartwidth);
            gy = map(gr, 40, 00, 0, growthchartheight);
            vertex(gx, gy);
        }
    });
    endShape();
    text(`${gr}%`, gx + 5, gy + 3);
    text('Growth rate', 0, growthchartheight + 12);
    stroke(50);
    rect(0, 0, growthchartwidth, growthchartheight);


}
