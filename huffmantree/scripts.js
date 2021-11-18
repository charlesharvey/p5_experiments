
const speech = 'abbcccddddeeeee';
const dict = [];


class Branch {

    constructor(l, r) {
        this.value;
        this.left;
        this.right;

        // this.calcValue();
    }

    // calcValue() {
    //     this.value = 0;
    //     if (this.left) {
    //         this.value += this.left.value
    //     }
    //     if (this.right) {
    //         this.value += this.right.value
    //     }


    // }

    addLeft(l) {
        this.left = l;
        // this.calcValue();
    }
}


const tree = new Branch([], []);




function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    // find the frequencies of each letter in the speech
    for (let i = 0; i < speech.length; i++) {
        const letter = speech.charAt(i);
        const letterinDict = dict.find(l => l.letter === letter);
        if (letterinDict) {
            letterinDict.count++;
        } else {
            dict.push({ letter: letter, count: 1 });
        }

    }

    // sort the dictionary by its inverse count;
    dict.sort((a, b) => {
        if (a.count > b.count) {
            return 1
        } else {
            return -1;
        }
    });


    let queue = [];

    let i = 0;


    // console.log(dict);
    while (dict.length > 1 && i < 20) {
        i++;

        if (dict.length > 1) {
            const a = dict[0];
            const acount = a.count;
            let b = dict[1];
            let bcount = b.count;
            let addingBranch = false;



            if (queue.length > 0) {

                const smallerInQueue = queue.find(b => b.value < bcount);
                if (smallerInQueue) {
                    // add the branch in quue to A
                    b = smallerInQueue;
                    bcount = smallerInQueue.value;

                    siqIndex = queue.indexOf(smallerInQueue);

                    addingBranch = true;
                } else {
                    // add b to a
                }


            } else {
                // add b to a

            }


            if (addingBranch) {
                dict.splice(0, 1);
                // queue.splice(siqIndex, 0);
            } else {
                dict.splice(0, 2);
            }


            const branch = new Branch();
            branch.left = a;
            branch.right = b;
            branch.value = acount + bcount;
            queue.push(branch);



            console.log(queue);
        }


    }







    // console.log(queue);
    // console.log(dict);
    // console.log(tree);

}



function draw() {
    background(0);


}
