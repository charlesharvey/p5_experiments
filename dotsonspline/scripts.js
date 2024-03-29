

let splines;


let target;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    target = createVector(0, 0);
    splines = [];
    // for (let i = 0; i < 10; i++) {
    //     splines.push(new Spline(i / 10));
    // }


    // splines.push(new Spline(71.594905, 41.774332, 0, 0, 171.680795, 184.837618, 85.248745, -4.233333, 0.1));
    // splines.push(new Spline(68.128865, 49.500165, 0, 0, 168.042875, 168.581435, 84.005195, -4.233333, 0.2));
    // splines.push(new Spline(66.753025, 59.342665, 0, 0, 163.736385, 148.252195, 79.639575, -8.995833, 0.3));
    // splines.push(new Spline(65.430115, 68.735373, 0, 0, 156.098105, 127.175297, 75.644365, -12.938124, 0.4));
    // splines.push(new Spline(66.382615, 79.530373, 0, 0, 147.464975, 113.581607, 69.400195, -17.409583, 0.5));
    // splines.push(new Spline(61.620115, 87.20329, 0, 0, 144.806055, 96.85556, 67.601035, -22.674792, 0.6));
    // splines.push(new Spline(57.607495, 96.092139, 0, 0, 136.960005, 74.570061, 65.792815, -26.615932, 0.7));
    // splines.push(new Spline(37.357815, 187.48037, 0, 0, -2.43078, -45.75454, 135.175625, -63.79104, 0.8));
    // splines.push(new Spline(38.469065, 184.30537, 0, 0, 3.87283, -54.6374, 131.471455, -59.79583, 0.9));


    // splines.push(new Spline(442.05, 444.816, -98.09, -31.962, -270.9, -225.681, -270.9, -225.681));
    splines.push(new Spline(166.81, 249.585, 0, 0, 222.875, 204.552, 273.77, 197.54));
    splines.push(new Spline(162.54, 273.035, 54.74, 45.22, 211.94, 183.684, 266.77, 177.38));
    splines.push(new Spline(165.13, 303.275, 0, 0, 215.229, 174.51, 274.12, 144.34));
    splines.push(new Spline(153.16, 324.485, 96.67, 55.44, 172.378, 120.529, 253.679, 130.411));
    splines.push(new Spline(147.56, 350.455, 111.285, 40.001, 177.694, 104.405, 246.471, 107.031));
    splines.push(new Spline(134.05, 380.765, 37.52, -24.29, 148.494, 65.853, 232.959, 82.6));
    splines.push(new Spline(131.6, 405.335, 31.875, -14.563, 57.385, 0.077, 217.63, 62.09));
    splines.push(new Spline(128.66, 429.345, 28.709, -10.352, 42.939, -19.658, 196.21, 39.551));
    splines.push(new Spline(123.48, 453.355, 32.766, -14.946, 39.754, -26.423, 190.541, 18.83));
    splines.push(new Spline(116.55, 484.855, 29.592, -32.083, 42.844, -38.437, 186.551, -8.26));
    splines.push(new Spline(111.86, 510.054, 17.28, -27.609, 38.26, -53.348, 170.52, -30.729));
    splines.push(new Spline(105.77, 540.156, 20.93, -35.141, 40.37, -67.969, 165.62, -58.59));
    splines.push(new Spline(100.66, 568.435, 12.18, -30.939, 19.98, -75.83, 153.23, -79.66));
    splines.push(new Spline(96.88, 587.896, 19.6, -42.281, 31.86, -79.15, 138.81, -92.051));
    splines.push(new Spline(89.95, 624.294, 11.62, -39.969, 28.349, -96.531, 128.8, -123.83));
    splines.push(new Spline(448.91, 448.246, 41.812, -20.211, 26.104, -70.588, -41.789, -227.641));
    splines.push(new Spline(444.851, 447.615, 9.029, -12.879, 41.891, -20.35, -53.41, -214.76));
    splines.push(new Spline(437.71, 444.255, 7.84, -17.711, 17.949, -42.91, -61.811, -197.61));
    splines.push(new Spline(426.163, 439.985, 3.028, -25.163, 1.239, -59.46, -64.892, -178.5));
    splines.push(new Spline(410.62, 432.845, 0, 0, 16.122, -13.62, -62.929, -155.26));
    splines.push(new Spline(396.83, 421.435, 0, 0, 4.811, -21.33, -65.939, -133.91));
    splines.push(new Spline(370.3, 403.445, 0, 0, 11.578, 0.74, -55.791, -105.63));
    splines.push(new Spline(341.25, 381.535, 0, 0, 13.371, 6.951, -43.119, -70.07));

}

function mouseMoved() {
    target.set((mouseX - width) / 2, (mouseY - height) / 2);
}



function draw() {
    background(0);



    splines.forEach(spline => {
        spline.update();
        spline.show();
    });




}
