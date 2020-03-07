


let arms = []


let followMode;

let numberofarms = 30;

function setup() {


    changeFollowMode();
    createCanvas(windowWidth - 20, windowHeight - 20);


    for (let i = 0; i < numberofarms; i++) {
        const arm = new Arm();
        arms.push(arm);

    }


}


function mousePressed() {
    changeFollowMode();
}


function changeFollowMode() {

    const options = ['noise', 'mouse', 'food'];
    followMode = random(options);

}


function draw() {
    background(0);



    arms.forEach(arm => {
        arm.show();
        arm.follow();

    });





}
