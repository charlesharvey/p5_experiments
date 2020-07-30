const nodeSize = 6;
let nodes;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    reset();

}


function mousePressed() {
    reset();
}

function reset() {
    nodes = [];

    for (let i = 0; i < nodeSize; i++) {
        // const x = random(20, width - 20);
        // const y = random(20, height - 20);

        const r = random(-70, height / 2);
        const x = sin(i / nodeSize * TWO_PI) * r + r + 120;
        const y = cos(i / nodeSize * TWO_PI) * r + height / 2;


        const node = new Node(i, x, y);
        nodes.push(node);
    }




    // add siblings
    nodes.forEach((node, i) => {

        const ia = (i + nodeSize - 2) % nodeSize;
        const ib = (i + nodeSize - 3) % nodeSize;

        const scorea = Math.round(random(1, 9));
        node.addSibling(nodes[ia], scorea);
        // nodes[ia].addSibling(node, scorea);

        if (Math.random() > 0.65) {
            const scoreb = Math.round(random(1, 9));
            node.addSibling(nodes[ib], scoreb);
            // nodes[ia].addSibling(node, scoreb);
        }


    });
}


function draw() {
    background(0);


    nodes.forEach(node => {
        node.show();
    })


}
