
let data = [
    45,
    62,
    121,
    198,
    291,
    440,
    571,
    830,
    1287,
    1975,
    2744,
    4515,
    6171,
    7823,
    9822,
    11951,
    14556,
    17390,
    20629,
    24553,
    28276,
    31481,
    34902,
    37567,
    40614,
    43102,
    45171,
    60374,
    64451,
    67102,
    69270,
    71330,
    73424,
    75200,
    75727,
    76245,
    77815,
    78773,
    79561,
    80151,
    81000,
    82167,
    83370,
    85216,
    86985,
    89073,
    90936,
    93158,
    95438,
    98369,
    102173,
    106165,
    110041,
    113739,
    119217,
    126000,
    134769,
    145632,
    156948,
    169605,
    182609,
    198513,
    220313,
    245641,
    276587,
    308257,
    338448,
    381653,
    422829,
    471036,
    532237,
]
// let data_without_china = [
//     66,
//     84,
//     102,
//     129,
//     157,
//     171,
//     184,
//     188,
//     229,
//     258,
//     278,
//     330,
//     354,
//     382,
//     461,
//     517,
//     522,
//     586,
//     608,
//     697,
//     781,
//     896,
//     999,
//     1150,
//     1257,
//     1527,
//     1837,
//     2411,
//     2493,
//     2936,
//     3670,
//     4546,
//     5965,
//     7161,
//     9047,
//     10785,
//     12888,
//     15029,
//     17817,
//     21522,
//     25470,
//     29306,
//     32985,
//     38439,
//     45204,
//     53955,
//     64808,
//     76099,
//     88745,
//     101728
// ];



let logarithmic = false;
let border = 80;
let howmanylabels = 10;
let h, w;
let growthchartwidth = 200;
let growthchartheight = 100;

let infections = [];
let maxInfection;

let predictionsMoreDaysOfGrowth = 80 - data.length;
let predictionMoreDaysTilFlat = 120 - data.length; // predictionsMoreDaysOfGrowth + data.length;
let lastgrowthrate = 0;

function setup() {


    createCanvas(windowWidth - 10, windowHeight - 10);

    w = width - border * 2;
    h = height - border * 2;


    data.forEach((datum, i) => {
        infections.push(new Infection(datum, i, false));
    })

    for (let i = 1; i < infections.length; i++) {
        const infection = infections[i];
        const yesterday = infections[i - 1];
        infection.setYesterday(yesterday);

    }


    calculatePredictions();

    calculateMaxInfection();



}


function calculatePredictions() {
    const dayssofar = infections.length;
    lastgrowthrate = infections[dayssofar - 1].growth;
    const totaldays = predictionMoreDaysTilFlat + predictionsMoreDaysOfGrowth;
    let lastamount = infections[dayssofar - 1].amount;
    let yesterday;
    for (let i = 1; i < totaldays; i++) {

        let predictedrate = lastgrowthrate; // days with constant growth
        if (i > predictionsMoreDaysOfGrowth) { // days with slowering growth
            predictedrate = lerp(0, lastgrowthrate, 1 - ((i - predictionsMoreDaysOfGrowth) / predictionMoreDaysTilFlat));
        }
        lastamount = lastamount * ((100 + predictedrate) / 100);
        const newinfection = (new Infection(lastamount, dayssofar + i - 1, true));

        if (yesterday) {
            newinfection.setYesterday(yesterday);
        }
        // newinfection.growth = round(predictedrate);
        infections.push(newinfection);

        yesterday = newinfection;

    }
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
    infections.forEach((infection) => {
        if (infection.visible && !infection.isPrediction) {
            // let y = infection.ypos();
            // let x = infection.xpos();
            vertex(infection.pos.x, infection.pos.y);
        }

    });
    endShape();




    fill(255);
    noStroke()
    text(`Prediction with  ${predictionsMoreDaysOfGrowth}  days of growth at ${lastgrowthrate}% `, border, border - 20);



    // graph of growth rates
    translate(border * 2, border * 2);
    stroke(100);
    noFill();
    strokeWeight(1);
    beginShape();
    let gx, gy, gr;
    infections.forEach((infection, index) => {
        if (infection.growth && infection.visible) {
            gr = infection.growth;
            gx = map(index, 0, infections.length - 1, 0, growthchartwidth);
            gy = map(gr, 100, 0, 0, growthchartheight);
            vertex(gx, gy);

            if (infection.highlighted) {
                ellipse(gx, gy, 5, 5);
            }
        }
    });
    endShape();
    text(`${gr}%`, gx + 5, gy + 3);
    text('Growth rate', 0, growthchartheight + 12);
    stroke(50);

    rect(0, 0, growthchartwidth, growthchartheight);




    if (frameCount % 2 == 1) {
        addVisibleInfection();
    }





}
