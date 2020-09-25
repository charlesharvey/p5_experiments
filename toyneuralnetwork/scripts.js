
// https://www.youtube.com/watch?v=qWK7yW8oS0I&list=PLRqwX-V7Uu6aCibgK1PTWWu9by6XFdCfh&index=12


let nn;
let m;


function setup() {

    createCanvas(400, 400);

    nn = new Neuralnetwork(2, 3, 1);



}


function draw() {

    // background(255);
    // let input = [];
    // let sum = 0
    // for (let i = 0; i < 2; i++) {
    //     const x = Math.random() * 20;
    //     input.push(x);
    //     sum += x
    // }
    // // let output = nn.feedforward(ar);


    // // text(output.data[0], 30, 30)

    // nn.train(input, [sum]);

    // console.log(nn.weights_ih.toArray());

    frameRate(1);

    trainNN();


    console.log('01', nn.feedforward([1, 1]));
    console.log('00', nn.feedforward([0, 0]));


}
function trainNN() {
    nn.train([1, 1], [1]);
    nn.train([0, 1], [0]);
    nn.train([1, 0], [0]);
    nn.train([0, 0], [0]);


}

