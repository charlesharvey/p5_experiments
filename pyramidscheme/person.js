class Person {


    constructor() {

        this.money = 250;
        this.inScheme = false;
        this.ableToRecruit = false; // they can only recuit once the current level has finisehd recruiting
        this.suckers = []; // people they have recruited;
        this.recruiter; // Person who recruited them
        this.level = -1; // what level in the scheme are they
        this.payments = [];
        this.gullibility = Math.random() * 0.002; // chance of signing up

    }


    payRecruiterFee(level) {
        if (this.recruiter !== undefined) {

            const mup = fee * Math.pow(percentage, level);
            this.recruiter.money += mup;
            this.money -= mup;
            this.recruiter.payments.push(mup);
            this.recruiter.payRecruiterFee(level + 1);

        }
    }



    payFeeTo(superior) {
        superior.money += fee;
        this.money -= fee;

        superior.payments.push(fee);



    }

}