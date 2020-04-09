class Person {
    constructor(is_prisoner, city) {
        this.is_prisoner = is_prisoner;
        this.city = city;
        this.label = 'Guard';
        if (this.is_prisoner) {
            this.label = 'Prisoner';
        }
    }


    move(other) {
        const otherscity = other.city;
        const options = this.city.neighbours.filter(c => c != otherscity && c.fancycity == false);
        const randomcity = random(options);
        this.city = randomcity;
    }


    movedCity(newcity) {
        if (this.city.neighbours.includes(newcity)) {
            this.city = newcity;
            return true;
        }

        return false;
    }


    show() {

        if (this.is_prisoner) {
            fill(255, 100, 100);
        } else {
            fill(100, 105, 255);
        }

        textSize(15);
        noStroke();
        text(this.label, this.city.pos.x + 20, this.city.pos.y + 20);

        strokeWeight(1);
        stroke(255);
        ellipse(this.city.pos.x, this.city.pos.y, 20, 20);


    }



}