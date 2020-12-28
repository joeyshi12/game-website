class FireBall {
    SPEED =  10;

    constructor(x, y, direction_x, direction_y) {
        this.x = x;
        this.y = y;
        this.direction_x = direction_x;
        this.direction_y = direction_y;
        this.rotation = 1;
    }

    update() {
        this.x += this.SPEED * this.direction_x;
        this.y += this.SPEED * this.direction_y;
    }

    draw(shift_x, shift_y) {
        if (gameManager.player.facingRight) {
            image(spriteSheet, this.x - shift_x, this.y - shift_y, unitLength, unitLength, 15 * 16, 10 * 16, 16, 16);
        } else {
            image(spriteSheet, (774 - unitLength) - (this.x - shift_x + spriteSheet.width), this.y - shift_y, unitLength, unitLength, 15 * 16, 10 * 16, 16, 16);
        }
    }
}