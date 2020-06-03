class Star {

    constructor() {
        this.pos = createVector(random(width), random(height));
        this.age = 0;

        // this.vel = this.pos.copy(); 
        // this.vel.setMag(3);



        this.z = random(minStarZ, maxStarZ);
        this.r = map(this.z, minStarZ, maxStarZ, minStarSize, maxStarSize);
        // this.r = random(minStarSize, maxStarSize);




    }


    update() {


        const x = map(this.pos.x, 0, width, -globalMag, globalMag);
        const y = map(this.pos.y, 0, height, -globalMag, globalMag);
        const vel = createVector(x + tx, y + ty);
        vel.mult(this.z);
        this.pos.add(vel);

        this.age++;
        this.r += 0.01;

    }


    edges() {
        if (this.pos.x > width || this.pos.x < 0) {
            return true;
        } else if (this.pos.y > height || this.pos.y < 0) {
            return true;
        }

        return false
    }

    show() {
        noStroke();
        const c = map(this.age, 0, 100, 0, 255);
        fill(c);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}