class Ghost extends Entity {
    SPEED = 2;
    RANGE = 320;
    UPDATE_BUFFER = 20;

    constructor(x, y, target) {
        super(x, y, 36, 36);
        this.target = target;
        this.vx = 0;
        this.vy = 0;
        this.angle = Math.random() * 2 * Math.PI;
        this.update_timer = 20;
        this.triggered = false;
        this.sprite = spriteSheet.get(26 * 16 + 1, 6 * 16, 14, 16);
    }

    update() {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const r = Math.sqrt(dx**2 + dy**2);
        if (r < this.RANGE) {
            this.triggered = true;
        }
        if (this.triggered) {
            const tx = dx / r;
            const ty = dy / r;
            if (this.update_timer > 0) {
                this.update_timer--;
            } else {
                this.vx = this.SPEED * tx + Math.random() - 0.5;
                this.vy = this.SPEED * ty + Math.random() - 0.5;
                this.update_timer = this.UPDATE_BUFFER;
            }
        }
        this.angle = (this.angle + 0.1) % (2 * Math.PI);
        this.x += this.vx + 0.7 * Math.cos(this.angle);
        this.y += this.vy + 0.7 * Math.sin(this.angle);
    }

    draw() {
        // this.drawHitBox();
        push();
        if (this.vx > 0) {
            scale(-1, 1);
            image(this.sprite, -(this.x - camera.x) - this.width, this.y - camera.y, this.width + 3 * Math.cos(this.angle), this.height);
        } else {
            image(this.sprite, this.x - camera.x, this.y - camera.y, this.width + 3 * Math.cos(this.angle), this.height);
        }
        pop();
    }
}