class Player {
    ACCELERATION = 0.4;
    GRAVITY = 0.4;
    MAX_SPEED = 4;
    ANIMATION_BUFFER = 6;
    WIDTH = unitLength - 6;
    HEIGHT = unitLength - 6;
    JUMP_VELOCITY = -9;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.rigidBody = new RigidBody(x, y, this.WIDTH, this.HEIGHT);
        this.direction = 0;
        this.animIdx = 0;
        this.animTimer = this.ANIMATION_BUFFER;
        this.grounded = false;
        this.facingRight = true;
        this.isLanding = false;
    }

    /**
     * If there is a solid / platform tile immediately below player, returns that y position; else return -1
     * @return {Number}     The y position of the immediate solid / platform tile below; else, -1
     */
    checkGround(map) {
        let groundCheck = false;

        let i = Math.floor((this.y + this.HEIGHT) / unitLength) + 1;
        let j = Math.floor(this.x / unitLength);
        groundCheck = groundCheck || solids.has(map[i * n + j]) || platforms.has(map[i * n + j]);
        // square(j * unitLength - this.x + camera.x, i * unitLength - this.y + camera.y, unitLength);

        j = Math.floor((this.x + this.WIDTH) / unitLength);
        groundCheck = groundCheck || solids.has(map[i * n + j]) || platforms.has(map[i * n + j]);
        // square(j * unitLength - this.x + camera.x, i * unitLength - this.y + camera.y, unitLength);

        if (groundCheck) {
            return i * unitLength;
        }

        return -1;
    }

    /**
     * If there is a solid tile immediately to the right of player, returns that x position; else return -1
     * @return {Number}     The y position of the immediate solid tile to the right; else, -1
     */
    checkRightWall(map) {
        let rightWallCheck = false;

        let i = Math.floor((this.y) / unitLength);
        let j = Math.floor((this.x + this.WIDTH) / unitLength) + 1;
        rightWallCheck = rightWallCheck || solids.has(map[i * n + j]);
        // square(j * unitLength - this.x + camera.x, i * unitLength - this.y + camera.y, unitLength);

        i = Math.floor((this.y + this.HEIGHT) / unitLength);
        rightWallCheck = rightWallCheck || solids.has(map[i * n + j]);
        // square(j * unitLength - this.x + camera.x, i * unitLength - this.y + camera.y, unitLength);

        if (rightWallCheck) {
            return j * unitLength;
        }

        return -1;
    }

    /**
     * If there is a solid tile immediately to the left of player, returns that x position; else return -1
     * @return {Number}     The y position of the immediate solid tile to the left; else, -1
     */
    checkLeftWall(map) {
        let leftWallCheck = false;

        let i = Math.floor(this.y / unitLength);
        let j = Math.floor(this.x / unitLength) - 1;
        leftWallCheck = leftWallCheck || solids.has(map[i * n + j]);
        // square(j * unitLength - this.x + camera.x, i * unitLength - this.y + camera.y, unitLength);

        i = Math.floor((this.y + this.HEIGHT) / unitLength);
        leftWallCheck = leftWallCheck || solids.has(map[i * n + j]);
        // square(j * unitLength - this.x + camera.x, i * unitLength - this.y + camera.y, unitLength);

        if (leftWallCheck) {
            return j * unitLength;
        }

        return -1;
    }

    /**
     * takes player off ground and sets initial vertical velocity to -9
     */
    jump() {
        this.y -= 1;
        this.vy = this.JUMP_VELOCITY;
        this.grounded = false;
    }

    /**
     * If player is on a platform tile, let them pass through the platform by moving them 1 unit down
     */
    dropDownPlatform(map) {
        let i = Math.floor((this.y + this.HEIGHT) / unitLength) + 1;
        let j = Math.floor((this.x) / unitLength);
        if (!platforms.has(map[i * n + j])) {
            return;
        }

        j = Math.floor((this.x + this.WIDTH) / unitLength);
        if (!platforms.has(map[i * n + j])) {
            return;
        }

        this.y += 1;
    }

    /**
     * updates player animation, velocity, position
     */
    update(map) {
        if (this.animTimer > 0) {
            this.animTimer--;
        } else {
            this.animTimer = this.ANIMATION_BUFFER;
            if (this.direction === 0) {
                this.animIdx = 0;
            } else {
                this.animIdx = (this.animIdx + 1) % 4;
            }
        }

        const rightWall = this.checkRightWall(map);
        const leftWall = this.checkLeftWall(map);
        if (rightWall > 0 && this.x + this.WIDTH + this.vx > rightWall - 1) {
            this.x = rightWall - this.WIDTH - 1;
            this.vx = 0;
        } else if (leftWall > 0 && this.x - this.vx < leftWall + unitLength + 1) {
            this.x = leftWall + unitLength + 1;
            this.vx = 0;
        } else {
            if (this.direction === 0) {
                if ((this.vx - this.ACCELERATION) * this.direction < 0) {
                    this.vx -= this.ACCELERATION;
                } else {
                    this.vx = 0;
                }
            } else {
                if (Math.abs(this.vx) <= this.MAX_SPEED) {
                    this.vx += this.ACCELERATION;
                } else {
                    this.vx = this.MAX_SPEED;
                }
            }
        }

        this.x += this.vx * this.direction;

        const ground = this.checkGround(map);
        this.grounded = ground > 0 && this.y + this.vy >= ground - this.HEIGHT - 1;
        if (this.grounded) {
            this.vy = 0;
            this.y = ground - this.HEIGHT - 1;
            if (this.isLanding) {
                landSound.play();
                this.isLanding = false;
            }
        } else {
            this.vy += this.GRAVITY;
            this.y += this.vy;
            this.animIdx = 4;
            this.isLanding = true;
        }

        this.rigidBody.x = this.x;
        this.rigidBody.y = this.y;
    }

    /**
     * Draws player on the canvas
     */
    draw(shift_x = 0, shift_y = 0) {
        // this.rigidBody.draw(shift_x, shift_y);

        if (this.facingRight) {
            image(spriteSheet, this.x - shift_x, this.y - shift_y, unitLength - 6, unitLength - 6, (18 + this.animIdx) * 16 + 1, 7 * 16 + 3, 14, 13);
        } else {
            scale(-1, 1);
            image(spriteSheet, (774 - unitLength) - (this.x - shift_x + spriteSheet.width), this.y - shift_y, unitLength - 6, unitLength - 6, (18 + this.animIdx) * 16 + 1, 7 * 16 + 3, 14, 13);
        }
    }
}
