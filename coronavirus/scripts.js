
let data = [
    { d: '2020-01-16', i: 45, t: 1, w: 0 },
    { d: '2020-01-17', i: 62, t: 2, w: 0 },
    { d: '2020-01-18', i: 121, t: 3, w: 0 },
    { d: '2020-01-19', i: 198, t: 4, w: 0 },
    { d: '2020-01-20', i: 291, t: 4, w: 0 },
    { d: '2020-01-21', i: 440, t: 6, w: 0 },
    { d: '2020-01-22', i: 571, t: 22, w: 9 },
    { d: '2020-01-23', i: 830, t: 25, w: 15 },
    { d: '2020-01-24', i: 1287, t: 41, w: 30 },
    { d: '2020-01-25', i: 1975, t: 55, w: 40 },
    { d: '2020-01-26', i: 2744, t: 80, w: 56 },
    { d: '2020-01-27', i: 4515, t: 106, w: 66 },
    { d: '2020-01-28', i: 6171, t: 133, w: 84 },
    { d: '2020-01-29', i: 7823, t: 170, w: 102 },
    { d: '2020-01-30', i: 9822, t: 213, w: 129 },
    { d: '2020-01-31', i: 11951, t: 259, w: 157 },
    { d: '2020-02-01', i: 14556, t: 305, w: 171 },
    { d: '2020-02-02', i: 17390, t: 362, w: 184 },
    { d: '2020-02-03', i: 20629, t: 427, w: 188 },
    { d: '2020-02-04', i: 24553, t: 492, w: 229 },
    { d: '2020-02-05', i: 28276, t: 565, w: 258 },
    { d: '2020-02-06', i: 31481, t: 639, w: 278 },
    { d: '2020-02-07', i: 34902, t: 724, w: 330 },
    { d: '2020-02-08', i: 37567, t: 813, w: 354 },
    { d: '2020-02-09', i: 40614, t: 910, w: 382 },
    { d: '2020-02-10', i: 43102, t: 1018, w: 461 },
    { d: '2020-02-11', i: 45171, t: 1115, w: 517 },
    { d: '2020-02-12', i: 60374, t: 1369, w: 522 },
    { d: '2020-02-13', i: 64451, t: 1383, w: 586 },
    { d: '2020-02-14', i: 67102, t: 1526, w: 608 },
    { d: '2020-02-15', i: 69270, t: 1669, w: 697 },
    { d: '2020-02-16', i: 71330, t: 1775, w: 781 },
    { d: '2020-02-17', i: 73424, t: 1874, w: 896 },
    { d: '2020-02-18', i: 75200, t: 2010, w: 999 },
    { d: '2020-02-19', i: 75727, t: 2128, w: 1150 },
    { d: '2020-02-20', i: 76245, t: 2247, w: 1257 },
    { d: '2020-02-21', i: 77815, t: 2360, w: 1527 },
    { d: '2020-02-22', i: 78773, t: 2462, w: 1837 },
    { d: '2020-02-23', i: 79561, t: 2619, w: 2411 },
    { d: '2020-02-24', i: 80151, t: 2701, w: 2493 },
    { d: '2020-02-25', i: 81000, t: 2764, w: 2936 },
    { d: '2020-02-26', i: 82167, t: 2801, w: 3670 },
    { d: '2020-02-27', i: 83370, t: 2858, w: 4546 },
    { d: '2020-02-28', i: 85216, t: 2924, w: 5965 },
    { d: '2020-02-29', i: 86985, t: 2980, w: 7161 },
    { d: '2020-03-01', i: 89073, t: 3045, w: 9047 },
    { d: '2020-03-02', i: 90936, t: 3118, w: 10785 },
    { d: '2020-03-03', i: 93158, t: 3203, w: 12888 },
    { d: '2020-03-04', i: 95438, t: 3284, w: 15029 },
    { d: '2020-03-05', i: 98369, t: 3383, w: 17817 },
    { d: '2020-03-06', i: 102173, t: 3493, w: 21522 },
    { d: '2020-03-07', i: 106165, t: 3594, w: 25470 },
    { d: '2020-03-08', i: 110041, t: 3825, w: 29306 },
    { d: '2020-03-09', i: 113739, t: 4016, w: 32985 },
    { d: '2020-03-10', i: 119217, t: 4299, w: 38439 },
    { d: '2020-03-11', i: 126000, t: 4634, w: 45204 },
    { d: '2020-03-12', i: 134769, t: 4983, w: 53955 },
    { d: '2020-03-13', i: 145632, t: 5436, w: 64808 },
    { d: '2020-03-14', i: 156948, t: 5839, w: 76099 },
    { d: '2020-03-15', i: 169605, t: 6518, w: 88745 },
    { d: '2020-03-16', i: 182609, t: 7171, w: 101728 },
    { d: '2020-03-17', i: 198513, t: 7988, w: 117619 },
    { d: '2020-03-18', i: 220313, t: 8983, w: 139385 },
    { d: '2020-03-19', i: 245641, t: 10051, w: 164674 },
    { d: '2020-03-20', i: 276587, t: 11415, w: 195579 },
    { d: '2020-03-21', i: 308257, t: 13068, w: 227203 },
    { d: '2020-03-22', i: 338448, t: 14691, w: 257394 },
    { d: '2020-03-23', i: 381653, t: 16558, w: 300482 },
    { d: '2020-03-24', i: 422829, t: 18909, w: 341611 },
    { d: '2020-03-25', i: 471036, t: 21284, w: 389751 },
    { d: '2020-03-26', i: 532237, t: 24089, w: 532237 - 81340 },
    // { d: '2020-03-27', i: 597252, t: 27365, w: 597252-81394},
    // { d: '2020-03-28', i: 663748, t: 30880, w: 663748-81394},
    // { d: '2020-03-29', i: 723700, t: 34018, w: 723700-81470},
    // { d: '2020-03-30', i: 785979, t: 37810, w: 785979-87956},
    // { d: '2020-03-31', i: 859032, t: 42322, w: 859032-81554},
    // { d: '2020-04-01', i: 937567, t: 47256, w: 937567-81589},
    // { d: '2020-04-02', i: 1016128, t: 53069, w: 1016128-81620},
    // { d: '2020-04-03', i: 1141190, t: 60960, w: 0},
    // { d: '2020-04-04', i: 1203099, t: 64774, w: 0},

];

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


let nextdates = [
    '2020-03-27',
    '2020-03-28',
    '2020-03-29',
    '2020-03-30',
    '2020-03-31',
    '2020-04-01',
    '2020-04-02',
    '2020-04-03',
    '2020-04-04',
    '2020-04-05',
    '2020-04-06',
    '2020-04-07',
    '2020-04-08',
    '2020-04-09',
    '2020-04-10',
    '2020-04-11',
    '2020-04-12',
    '2020-04-13',
    '2020-04-14',
    '2020-04-15',
    '2020-04-16',
    '2020-04-17',
    '2020-04-18',
    '2020-04-19',
    '2020-04-20',
    '2020-04-21',
    '2020-04-22',
    '2020-04-23',
    '2020-04-24',
    '2020-04-25',
    '2020-04-26',
    '2020-04-27',
    '2020-04-28',
    '2020-04-29',
    '2020-04-30',
    '2020-05-01',
    '2020-05-02',
    '2020-05-03',
    '2020-05-04',
    '2020-05-05',
    '2020-05-06',
    '2020-05-07',
    '2020-05-08',
    '2020-05-09',
    '2020-05-10',
    '2020-05-11',
    '2020-05-12',
    '2020-05-13',
    '2020-05-14',
    '2020-05-15',
    '2020-05-16',
    '2020-05-17',
    '2020-05-18',
    '2020-05-19',
    '2020-05-20',
    '2020-05-21',
    '2020-05-22',
]

function setup() {


    createCanvas(windowWidth - 10, windowHeight - 10);

    w = width - border * 2;
    h = height - border * 2;


    data.forEach((datum, i) => {
        infections.push(new Infection(datum.i, datum.d, i, false));
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
        const date = nextdates[i - 1];

        const newinfection = (new Infection(lastamount, date, dayssofar + i - 1, true));

        if (yesterday) {
            newinfection.setYesterday(yesterday);
        }
        // newinfection.growth = round(predictedrate);
        infections.push(newinfection);

        yesterday = newinfection;

    }
}

function dateToString(date) {
    const d = date;
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
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
