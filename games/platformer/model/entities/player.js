class Player extends Entity {
    ACCELERATION = 0.8;
    GRAVITY = 0.4;
    MAX_SPEED = 4;
    ANIMATION_BUFFER = 6;
    JUMP_VELOCITY = -10;

    constructor(x, y, camera) {
        super(x, y, unitLength - 6, unitLength - 6, camera);
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
        if (rightWall !== -1 && this.x + this.width + this.vx > rightWall) {
            this.x = rightWall - this.width - 1;
            this.vx = 0;
        } else if (leftWall !== -1 && this.x + this.vx < leftWall + unitLength) {
            this.x = leftWall + unitLength + 1;
            this.vx = 0;
        } else {
            if (this.direction === 0) {
                if (this.vx > 0) {
                    this.vx = Math.max(0, this.vx - this.ACCELERATION);
                } else if (this.vx < 0) {
                    this.vx = Math.min(0, this.vx + this.ACCELERATION);
                }
            } else {
                if (this.direction === 1) {
                    this.vx = Math.min(this.MAX_SPEED, this.vx + this.ACCELERATION);
                } else {
                    this.vx = Math.max(-this.MAX_SPEED, this.vx - this.ACCELERATION);
                }
            }
            this.x += this.vx;
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

    draw() {
        push();
        if (this.facingRight) {
            image(spriteSheet, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height, (18 + this.animIdx) * 16 + 1, 7 * 16 + 3, 14, 13);
        } else {
            scale(-1, 1);
            image(spriteSheet, (774 - unitLength) - (this.x - this.camera.x + spriteSheet.width), this.y - this.camera.y, this.width, this.height, (18 + this.animIdx) * 16 + 1, 7 * 16 + 3, 14, 13);
        }
        pop();
    }
}
