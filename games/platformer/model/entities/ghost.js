class Ghost extends Entity {
    ACCELERATION = 2.5;
    MAX_SPEED = 2.5;
    RANGE = 400;
    theta = 0;
    update_timer = 28;
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
        if (r < this.RANGE) {
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
            this.update_timer = 28;
            if (this.vx**2 + this.vy**2 < this.MAX_SPEED) {
                this.vx += this.ACCELERATION * dx;
                this.vy += this.ACCELERATION * dy;
            } else {
                this.vx = this.MAX_SPEED * dx;
                this.vy = this.MAX_SPEED * dy;
            }
        }
        this.width += 0.4*Math.cos(this.theta)
        this.theta += 0.1;
        this.x = this.x + this.vx - 0.4*Math.sin(this.theta);
        this.y = this.y + this.vy + 0.4*Math.cos(this.theta);
    }

    draw() {
        push();
        if (this.vx > 0) {
            scale(-1, 1);
            image(spriteSheet, (774 - unitLength) - (this.x - camera.x + spriteSheet.width), this.y - camera.y, this.width, this.height, 26*16 + 1, 6*16 + 3, 14, 13);
        } else {
            image(spriteSheet, this.x - camera.x, this.y - camera.y, this.width, this.height, 26*16 + 1, 6*16 + 3, 14, 13);
        }
        pop();
    }
}