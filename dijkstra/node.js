class Node {
    constructor(i, x, y) {
        this.i = i;
        this.x = x;
        this.y = y;
        this.siblings = [];
    }


    addSibling(sibling, score) {
        if (!this.siblings.includes(sibling)) {
            this.siblings.push({ node: sibling, score: score });
        }

    }

    show() {

        fill(255);
        noStroke();
        ellipse(this.x, this.y, 5, 5);


        this.siblings.forEach(sibling => {
            stroke(200);

            noFill();
            strokeWeight(sibling.score)
            line(sibling.node.x, sibling.node.y, this.x, this.y);
            const lx = lerp(sibling.node.x, this.x, 0.5) + 10;
            const ly = lerp(sibling.node.y, this.y, 0.5) + 10;
            noStroke();
            fill(126);
            text(sibling.score, lx, ly);

        })

        fill(255, 0, 200);
        text(this.i, this.x + 10, this.y + 10);



    }
}