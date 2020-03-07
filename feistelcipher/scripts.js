

let part1 = strToBinary('56789');
let part2 = strToBinary('11111');

const keys = [12345, 23456, 43912];


// STAGE 1
for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const encryptedpart = encrypt(part2, key);
    part2 = encryptedpart;
    swapParts();
}

swapParts();



for (let i = 0; i < keys.reverse().length; i++) {
    const key = keys[i];
    const encryptedpart = encrypt(part2, key);
    part2 = encryptedpart;
    swapParts();
}

swapParts();







function swapParts() {

    const tmp = part1;
    part1 = part2;
    part2 = tmp;

    // console.log(part1, part2);

}




function strToBinary(input) {
    // let output = '';
    // for (var i = 0; i < input.length; i++) {
    //     output += input[i].charCodeAt(0).toString(2);
    // }
    // return output;
    return parseInt(input, 10).toString(2);
}


function encrypt(input, key) {
    const binkey = strToBinary(key.toString());

    return xor(input, binkey);
}


function xor(a, b) {



    const output = parseInt(a, 2) ^ parseInt(b, 2);

    console.log(a, b, output);
    return output;

};