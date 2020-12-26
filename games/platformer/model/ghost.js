class Ghost extends GameObject {
    ACCELERATION = 0.1;
    MAX_SPEED = 2.5;
    RANGE = 300;
    theta = 0;
    update_timer = 8;
    trigger = false;

    constructor(x, y, target) {
        super(x, y, unitLength - 6, unitLength - 6);
        this.target = target;
        this.vx = 0;
        this.vy = 0;
    }

    update() {
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        const r = Math.sqrt(dx**2 + dy**2);
        if (r > this.RANGE) {
            this.trigger = true;
        }
        if (!this.trigger) {
            return;
        }
        dx = dx / r;
        dy = dy / r;
        if (this.update_timer > 0) {
            this.update_timer -= 1;
        } else {
            this.update_timer = 10;
            if (this.vx**2 + this.vy**2 < this.MAX_SPEED) {
                this.vx += this.ACCELERATION * dx;
                this.vy += this.ACCELERATION * dy;
            } else {
                this.vx = this.MAX_SPEED * dx;
                this.vy = this.MAX_SPEED * dy;
            }
        }
        this.theta += 0.1;
        this.x = this.x + this.vx + Math.cos(this.theta);
        this.y = this.y + this.vy + Math.sin(this.theta);
    }

    draw(shift_x, shift_y) {
        push();
        if (this.facingRight) {
            image(spriteSheet, this.x - shift_x, this.y - shift_y, this.width, this.height, 26*16 + 1, 6*16 + 3, 14, 13);
        } else {
            scale(-1, 1);
            image(spriteSheet, (774 - unitLength) - (this.x - shift_x + spriteSheet.width), this.y - shift_y, this.width, this.height, 26*16 + 1, 6*16 + 3, 14, 13);
        }
        pop();
    }
}