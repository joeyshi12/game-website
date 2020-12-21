class Player extends GameObject {
    ACCELERATION = 0.4;
    GRAVITY = 0.4;
    MAX_SPEED = 4;
    ANIMATION_BUFFER = 6;
    JUMP_VELOCITY = -9;

    constructor(x, y) {
        super(x, y, unitLength - 6, unitLength - 6);
        this.vx = 0;
        this.vy = 0;
        this.direction = 0;
        this.animIdx = 0;
        this.animTimer = this.ANIMATION_BUFFER;
        this.grounded = false;
        this.facingRight = true;
        this.isLanding = false;
    }

    jump() {
        this.y -= 1;
        this.vy = this.JUMP_VELOCITY;
        this.grounded = false;
    }

    dropDownPlatform(map) {
        let i = Math.floor((this.y + this.height) / unitLength) + 1;
        for (let j = Math.floor((this.x) / unitLength); j <= Math.floor((this.x + this.width) / unitLength); j++) {
            if (!platforms.has(map[i * n + j])) {
                return;
            }
        }
        this.y += 1;
    }

    isDead(map) {
        let i = Math.floor((this.y + this.height / 2) / unitLength);
        let j = Math.floor((this.x + this.width / 2) / unitLength);
        return map[i * n + j] === 22;
    }

    update(map) {
        this.updateAnimation();
        this.updateHorizontal(map);
        this.updateVerticalMovement(map);
    }

    updateVerticalMovement(map) {
        const ceiling = this.checkCeiling(map);
        const ground = this.checkGround(map);
        this.grounded = ground !== -1 && this.y + this.vy >= ground - this.height - 1;
        if (this.grounded) {
            this.vy = 0;
            this.y = ground - this.height - 1;
            if (this.isLanding) {
                landSound.play();
                this.isLanding = false;
            }
        } else {
            if (ceiling >= 0 && this.y + this.vy <= ceiling + 1) {
                this.vy = 1;
                this.y = ceiling + 1;
            } else {
                this.vy += this.GRAVITY;
                this.y += this.vy;
            }
            this.isLanding = true;
        }
    }

    updateHorizontal(map) {
        const rightWall = this.checkRightWall(map);
        const leftWall = this.checkLeftWall(map);
        if (rightWall >= 0 && this.x + this.width + this.vx > rightWall - 1 && this.facingRight) {
            this.x = rightWall - this.width - 1;
            this.vx = 0;
        } else if (leftWall >= 0 && this.x - this.vx < leftWall + unitLength + 1 && !this.facingRight) {
            this.x = leftWall + unitLength + 1;
            this.vx = 0;
        } else {
            this.vx = this.direction ? Math.min(this.MAX_SPEED, this.vx + this.ACCELERATION) : Math.max(0, this.vx - this.ACCELERATION);
            if (this.facingRight) {
                this.x += this.vx
            } else {
                this.x -= this.vx
            }
        }
    }

    updateAnimation() {
        if (this.grounded) {
            if (this.animTimer > 0) {
                this.animTimer--;
            } else {
                this.animTimer = this.ANIMATION_BUFFER;
                if (this.vx === 0) {
                    this.animIdx = 0;
                } else {
                    this.animIdx = (this.animIdx + 1) % 4;
                }
            }
        } else {
            this.animIdx = 4;
        }
    }

    draw(shift_x, shift_y) {
        if (this.facingRight) {
            image(spriteSheet, this.x - shift_x, this.y - shift_y, unitLength - 6, unitLength - 6, (18 + this.animIdx) * 16 + 1, 7 * 16 + 3, 14, 13);
        } else {
            scale(-1, 1);
            image(spriteSheet, (774 - unitLength) - (this.x - shift_x + spriteSheet.width), this.y - shift_y, unitLength - 6, unitLength - 6, (18 + this.animIdx) * 16 + 1, 7 * 16 + 3, 14, 13);
        }
    }
}
