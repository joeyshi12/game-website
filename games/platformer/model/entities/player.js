class Player extends Entity {
    ACCELERATION = 0.8;
    GRAVITY = 0.4;
    MAX_SPEED = 4;
    ANIMATION_BUFFER = 6;
    JUMP_VELOCITY = -10;

    constructor(x, y) {
        super(x, y, unitLength - 6, unitLength - 6);
        this.vx = 0;
        this.vy = 0;
        this.direction = 0;
        this.animIdx = 0;
        this.animTimer = this.ANIMATION_BUFFER;
        this.isGrounded = false;
        this.isFacingRight = true;
        this.isLanding = false;
        this.isDead = false;
    }

    moveLeft() {
        if (!this.isDead) {
            this.direction = -1;
            this.isFacingRight = false;
        }
    }

    moveRight() {
        if (!this.isDead) {
            this.direction = 1;
            this.isFacingRight = true;
        }
    }

    jump() {
        if (!this.isDead && this.isGrounded) {
            this.y -= 1;
            this.vy = this.JUMP_VELOCITY;
            this.isGrounded = false;
            jumpSound.play();
        }
    }

    dropDownPlatform(map) {
        if (!this.isDead && this.isGrounded) {
            let i = Math.floor((this.y + this.height) / unitLength) + 1;
            for (let j = Math.floor((this.x) / unitLength); j <= Math.floor((this.x + this.width) / unitLength); j++) {
                if (!platforms.has(map.getTile(i, j))) {
                    return;
                }
            }
            this.y += 1;
        }
    }

    setDead() {
        this.isDead = true;
    }

    update(map) {
        this.updateAnimation();
        this.updateHorizontal(map);
        this.updateVerticalMovement(map);
    }

    updateVerticalMovement(map) {
        const ceiling = this.checkCeiling(map);
        const ground = this.checkGround(map);
        this.isGrounded = ground !== -1 && this.y + this.vy >= ground - this.height - 1;
        if (this.isGrounded) {
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
            if (this.direction === 0 || this.isDead) {
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
        if (this.isDead) {
            this.animIdx = 5;
        } else {
            if (this.isGrounded) {
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
    }

    draw() {
        push();
        if (this.isFacingRight) {
            image(spriteSheet, this.x - camera.x, this.y - camera.y, this.width, this.height, (18 + this.animIdx) * 16 + 1, 7 * 16 + 3, 14, 13);
        } else {
            scale(-1, 1);
            image(spriteSheet, (774 - unitLength) - (this.x - camera.x + spriteSheet.width), this.y - camera.y, this.width, this.height, (18 + this.animIdx) * 16 + 1, 7 * 16 + 3, 14, 13);
        }
        pop();
    }
}
