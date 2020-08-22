class Player {
    ACCELERATION = 0.4;
    GRAVITY = 0.4;
    MAX_SPEED = 4;
    ANIMATION_BUFFER = 6;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.direction = 0;
        this.animIdx = 0;
        this.animTimer = this.ANIMATION_BUFFER;
        this.grounded = false;
        this.facingRight = true;
    }

    /**
     * If there is a solid / platform tile immediately below player, returns that y position; else return -1
     * @return {Number}     The y position of the immediate solid / platform tile below; else, -1
     */
    checkGround() {
        let groundCheck = false;

        let i = Math.floor((player.y + unitLength) / unitLength) + 1;
        let j = Math.floor((player.x + 9) / unitLength);
        // square(j * unitLength - player.x + center_x, i * unitLength - player.y + center_y, unitLength);
        // square(732 - (j * unitLength - player.x + center_x + spriteSheet.width), i * unitLength - player.y + center_y, unitLength);
        groundCheck = groundCheck || solids.has(tilemap.cells[i * tilemap.n + j]) || platforms.has(tilemap.cells[i * tilemap.n + j]);

        j = Math.floor((player.x + unitLength - 9) / unitLength);
        // square(j * unitLength - player.x + center_x, i * unitLength - player.y + center_y, unitLength);
        // square(732 - (j * unitLength - player.x + center_x + spriteSheet.width), i * unitLength - player.y + center_y, unitLength);
        groundCheck = groundCheck || solids.has(tilemap.cells[i * tilemap.n + j]) || platforms.has(tilemap.cells[i * tilemap.n + j]);

        if (groundCheck) {
            return i * unitLength;
        }

        return -1;
    }

    /**
     * If there is a solid tile immediately to the right of player, returns that x position; else return -1
     * @return {Number}     The y position of the immediate solid tile to the right; else, -1
     */
    checkRightWall() {}

    /**
     * If there is a solid tile immediately to the left of player, returns that x position; else return -1
     * @return {Number}     The y position of the immediate solid tile to the left; else, -1
     */
    checkLeftWall() {
        // if there is a wall to the left, return the x position of the wall; else -1
        return -1;
    }

    /**
     * If player is on a platform tile, let them pass through the platform by moving them 1 unit down
     */
    dropDownPlatform() {
        let i = Math.floor((player.y + unitLength) / unitLength) + 1;
        let j = Math.floor((player.x + 9) / unitLength);
        if (!platforms.has(tilemap.cells[i * tilemap.n + j])) {
            return;
        }

        j = Math.floor((player.x + unitLength - 9) / unitLength);
        if (!platforms.has(tilemap.cells[i * tilemap.n + j])) {
            return;
        }

        player.y += 1;
    }

    /**
     * updates player animation, velocity, position
     */
    update() {
        if (this.animTimer > 0) {
            this.animTimer--;
        } else {
            this.animTimer = this.ANIMATION_BUFFER;
            if (this.vx ** 2 > 0) {
                this.animIdx = (this.animIdx + 1) % 4;
            } else {
                this.animIdx = 0;
            }
        }

        // const rightWall = this.checkRightWall();

        if (this.direction === 0) {
            if ((this.vx - this.ACCELERATION) * this.direction < 0) {
                this.vx -= this.ACCELERATION;
            } else {
                this.vx = 0;
            }
        } else {
            // if (rightWall > 0 && this.x + this.vx >= rightWall - unitLength - 1) {
            //     console.log("HIT WALL");
            //     this.vx = 0;
            // } else {
            //     if (Math.abs(this.vx) <= this.MAX_SPEED) {
            //         this.vx += this.ACCELERATION;
            //     } else {
            //         this.vx = this.MAX_SPEED;
            //     }
            // }

            if (Math.abs(this.vx) <= this.MAX_SPEED) {
                this.vx += this.ACCELERATION;
            } else {
                this.vx = this.MAX_SPEED;
            }
        }

        this.x += this.vx * this.direction;

        const ground = this.checkGround();
        this.grounded = ground > 0 && this.y + this.vy >= ground - unitLength - 1;
        if (this.grounded) {
            this.vy = 0;
            this.y = ground - unitLength - 1;
        } else {
            this.vy += this.GRAVITY;
            this.y += this.vy;
            this.animIdx = 4;
        }
    }

    /**
     * Draws player on the canvas
     */
    draw() {
        // noFill();
        // stroke(0, 255, 0);
        // rect(center_x, center_y, unitLength, unitLength);

        if (this.facingRight) {
            image(spriteSheet, camera.x, camera.y, unitLength, unitLength, (18 + this.animIdx) * 16, 7 * 16 + 1, 16, 15);
        } else {
            scale(-1, 1);
            image(spriteSheet, 732 - (camera.x + spriteSheet.width), camera.y, unitLength, unitLength, (18 + this.animIdx) * 16, 7 * 16 + 1, 16, 15);
        }
    }
}

let player = new Player(100, 0);