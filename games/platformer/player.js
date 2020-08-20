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
    }

    checkGround() {
        let groundCheck = false;

        let i = Math.floor((player.y + unitLength) / unitLength) + 1;
        let j = Math.floor((player.x + 9) / unitLength);
        groundCheck = groundCheck || solidTiles.has(tilemap.cells[i * tilemap.n + j]);

        j = Math.floor((player.x + unitLength - 9) / unitLength);
        groundCheck = groundCheck || solidTiles.has(tilemap.cells[i * tilemap.n + j]);

        if (groundCheck) {
            return i * unitLength;
        }

        return -1;
    }

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

    draw() {
        image(spriteSheet, player.x, player.y, unitLength, unitLength, (18 + this.animIdx) * 16, 7 * 16 + 0.5, 16, 16);
    }
}

let player = new Player(0, 0);