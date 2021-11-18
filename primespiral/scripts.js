


let e;  // dot size
let i = 0;  // increment
let maxPrime
let speed;
let primeGenerator;
function setup() {


    createCanvas(windowWidth - 15, windowHeight - 30);
    background(0);
    colorMode(HSL, 255, 255, 255);


    reset();
}


function reset() {
    background(0);
    maxPrime = Math.round(random(100, 100000));
    speed = Math.log(maxPrime) / 2;  // how many dots per frame are drawn
    i = 0;
    e = 5 / speed; // dot size;
    primeGenerator = genPrime(maxPrime);
    console.log(maxPrime, speed, e);
}


function draw() {

    noStroke();
    fill(255);



    // scale(1 + i / 5000);


    for (let a = 0; a < speed; a++) {

        // let prime = primes[i];


        const prime = primeGenerator.next().value;


        let r = prime / (maxPrime / width * 2)
        // let x = (sin(prime * prime) * r) + width / 2;
        let x = (sin(prime) * r) + width / 2;
        let y = (cos(prime) * r) + height / 2;

        // let h = i % 256;
        // fill(h, 255, 100);
        ellipse(x, y, e, e);



        if (prime === undefined) {
            reset();
        }


        i++;




    }







}

function* genPrime(n) {

    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2)
        return " Number not valid : " + n;

    for (var i = 2; i < n; i++) {
        if (isPrime(i)) {
            yield i;
        }
    }
}


function isPrime(num) {
    for (var i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}



