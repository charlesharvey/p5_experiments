class Node {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.detection_time = null;
        this.start_tracking = false;
        this.br = 0;
    }

    listen(noise, r) {

        if (!this.detection_time) {
            const d = p5.Vector.dist(this.pos, noise);
            if (r > (d * 2)) {
                this.detection_time = r;
            }
        }


    }


    // shareInfo(nodes) {
    //     if (nodes.every(n => !!n.detection_time)) {
    //         nodes.forEach(other => {
    //             if (other !== this) {
    //                 // const tr = (other.detection_time - this.detection_time);
    //                 // if (tr > 0) {
    //                 //     const lp = p5.Vector.lerp(this.pos, other.pos, 0.5);
    //                 //     noStroke();
    //                 //     fill(255);
    //                 //     text(tr, lp.x, lp.y);
    //                 // }
    //             }
    //         })
    //     }
    // }


    show() {
        noStroke();
        fill(0, 255, 0);
        ellipse(this.pos.x, this.pos.y, 5, 5);

        if (this.detection_time) {

            stroke(0, 100, 200, 150);
            fill(0, 100, 200, 50)
            ellipse(this.pos.x, this.pos.y, this.br, this.br);


            if (this.br < this.detection_time) {
                this.br += 10;
            } else {
                this.br = this.detection_time;
            }

        }
    }
}