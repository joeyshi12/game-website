class ArrowAttack {
    constructor(x, y, vx, vy) {
        self.x = x;
        self.y = y;
        self.vx = vx;
        self.vy = vy
    }

    update() {
        self.x += self.vx;
        self.y += self.vy;
    }

    draw() {
        image(spriteSheet, this.x - player.x, this.y - player.y, unitLength, unitLength, (18 + this.animIdx) * 16, 7 * 16 + 0.5, 16, 16);
    }
}