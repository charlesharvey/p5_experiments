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

        let newcity = null;
        if (other.city.pos.y > (grid * 2.5)) {
            // if other on third level, stay on the first level
            const betteroptions = this.city.neighbours.filter(c => c != otherscity && c.fancycity == false && c.pos.y === this.city.pos.y);
            if (betteroptions.length > 0) {
                const randomcity = random(betteroptions);
                newcity = randomcity;
            }
        }

        if (!newcity) {
            const options = this.city.neighbours.filter(c => c != otherscity && c.fancycity == false);
            newcity = random(options);
        }
        this.city = newcity;
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