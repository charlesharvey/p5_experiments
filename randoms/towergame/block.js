class Block {

    constructor(width) {
        this.x = Math.round(random(0, cols));
        this.y = 0;
        this.setWidth();
        this.current = true;

    }


    setWidth() {
        let w = max_block_width;
        let l = nthInStack(1); // top of stack
        let s = nthInStack(2); // next one down
        if (s && l) {
            const x = max(s.x, l.x);
            const y = min(s.x + s.w, l.x + l.w);
            w = Math.floor(y - x);
        }
        this.w = w;

    }

    update() {
        if (this.current) {
            this.y += 0.5;
        }

    }

    moveLeft() {
        this.x -= 1;
    }
    moveRight() {
        this.x += 1;
    }

    died() {
        let l = nthInStack(1); // top of stack

        if (l) {
            const x = max(this.x, l.x);
            const y = min(this.x + this.w, l.x + l.w);
            const w = y - x;
            return w < 0;
        }
        return false;

    }

    touched() {

        if (this.y > rows - (block_height * stack.length)) {
            this.current = false;
            return true;

        }
        return false;
    }


    show() {
        if (this.current) {
            fill(255, 0, 0);
        } else {
            fill(100, 100, 100);
        }

        rect(this.x * grid, this.y * grid, this.w * grid, 5 * grid)


    }
}