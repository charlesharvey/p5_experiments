class Evenbettercell {
    constructor() {

        this.pos = createVector(width / 2, height / 2);

        this.foc1 = this.pos.copy();
        this.foc2 = this.pos.copy();


        this.vel1 = p5.Vector.random2D();
        this.vel1.setMag(0.3);
        this.vel2 = this.vel1.copy();
        this.vel2.mult(-1);


        this.r = 100;
        this.growthrate = 0.3;
        this.gridsize = 3;

        this.col = color(250, 100, 250);
        this.col2 = color(200, 100, 250, 200);


    }





    update() {

        if (this.r < 100) {
            this.r += this.growthrate;
        } else {

            this.foc1.add(this.vel1);
            this.foc2.add(this.vel2);

        }

    }







    show() {




        const lefx = min(this.foc1.x, this.foc2.x);
        const rigx = max(this.foc1.x, this.foc2.x);
        const topy = min(this.foc1.y, this.foc2.y);
        const boty = max(this.foc1.y, this.foc2.y);

        const x0 = lefx - this.r; // 2 ;
        const x1 = rigx + this.r; // 2 ;
        const y0 = topy - this.r; // 2 ;
        const y1 = boty + this.r; // 2 ;


        // stroke(255);
        // strokeWeight(3);
        // beginShape();
        // vertex(x0, y0);
        // vertex(x1, y0);
        // vertex(x1, y1);
        // vertex(x0, y1);
        // endShape(CLOSE);

        noStroke();

        // beginShape();
        for (let x = x0; x < x1; x += this.gridsize) {
            for (let y = y0; y < y1; y += this.gridsize) {

                const d1 = dist(x, y, this.foc1.x, this.foc1.y);
                const d2 = dist(x, y, this.foc2.x, this.foc2.y);
                const d3 = (d1 + d2) / 2;



                const e1 = Math.floor(d1) == this.r;
                const e2 = Math.floor(d2) == this.r;
                const lt1 = (d1) < this.r;
                const lt2 = (d2) < this.r;
                const lt3 = (d3) < (this.r * 1.3);

                // (lt1 || lt2) ||

                // if (((!lt3 || !lt2) && lt3)) {
                // if (lt3 && (!lt1 || !lt2)) {
                //     fill(this.col2);
                //     ellipse(x, y, this.gridsize * 1.2, this.gridsize * 1.2);
                // } 

                if (lt1 || lt2) {
                    fill(this.col2);
                    ellipse(x, y, this.gridsize * 1.2, this.gridsize * 1.2);
                }

                // BORDER
                if (e1 && !lt2 || e2 && !lt1) {
                    fill(this.col);
                    ellipse(x, y, this.gridsize * 1.2, this.gridsize * 1.2);
                    // vertex(x, y);
                }


                // line(x, y, this.foc1.x, this.foc2.y);


            }
        }



        fill(0, 0, 0);
        ellipse(this.foc1.x, this.foc1.y, 20, 20);
        ellipse(this.foc2.x, this.foc2.y, 20, 20);

    }
}