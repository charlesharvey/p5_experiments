class Key {

    constructor(index, freq) {
        this.index = index;
        this.freq = freq;
        this.duration = 400; // ms to play note
        this.color = 'white';
        this.h = keyHeight;
        this.w = keyWidth;
        this.highlighted = false;
        this.sounding = false;

        const modin12 = this.index % 12;

        if (blackIndices.includes(modin12)) {
            this.color = 'black';
            this.h = keyHeight - 50;
        }



        this.x = (index * 1.05) * this.w + offset;
        this.y = offset;


        if (this.color === 'white') {
            this.w = keyWidth * (1.5);
        }
        if (modin12 == 2 || modin12 == 7 || modin12 == 9) {
            this.w = keyWidth * 2;
            this.x -= (keyWidth * 0.5);
        } else if (modin12 == 4 || modin12 == 11) {
            this.x -= (keyWidth * 0.5);
        }



    }




    highlight(x, y) {
        this.highlighted = false;
        if (x > this.x && x < (this.x + this.w)) {
            if (y > this.y && y < (this.y + this.h)) {
                this.highlighted = true;
            }
        }

    }

    play() {
        if (!this.sounding) {
            this.sounding = true;

            const o = context.createOscillator();
            o.connect(g)
            o.type = 'sine';
            o.frequency.setValueAtTime(this.freq, context.currentTime);
            o.start();
            g.gain.exponentialRampToValueAtTime(1, context.currentTime + 0.1);

            setTimeout(() => {

                g.gain.setTargetAtTime(1 / 1000, context.currentTime, 0.02);
                o.stop(context.currentTime);

                this.sounding = false;
            }, this.duration);
        }

    }


    allowAudio() {
        this.context.resume().then(() => {
            console.log('Playback resumed successfully');
        });
    }

    show() {

        stroke(120, 0, 50);
        strokeWeight(3);

        if (this.highlighted) {
            fill(200, 100, 100);
            if (this.color == 'black') {
                fill(200, 100, 60);
            }
        } else if (this.color == 'black') {
            fill(0);
        } else {
            fill(255);
        }

        rect(this.x, this.y, this.w, this.h);


        if (this.index % 12 == 0) {
            noStroke();
            fill(100, 100, 50);
            text('C', this.x + (this.w / 2), this.y + this.h - 10);
        }

    }
}