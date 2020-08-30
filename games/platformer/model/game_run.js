class GameRun {
    constructor() {
        this.camera = new Camera((width - unitLength) / 2, height / 2);
        this.tilemaps = [new Tilemap(cells1, m, n), new Tilemap(cells2, m, n)];
        this.mapIdx = 0;
        this.player = new Player(100, 100);
    }

    update() {
        if (this.mapIdx === 0 && this.player.x > n * unitLength - 10) {
            this.mapIdx = 1;
            this.player.x = -10;
        } else if (this.mapIdx === 1 && this.player.x + this.player.WIDTH - 10 < 0) {
            this.mapIdx = 0;
            this.player.x = n * unitLength - 10;
        }

        if (this.player.isDead(this.tilemaps[this.mapIdx].cells)) {
            this.player.x = 100;
            this.player.y = 100;
            this.player.vx = 0;
            this.player.vy = 0;
            this.mapIdx = 0;
        } else {
            this.player.update(this.tilemaps[this.mapIdx].cells);
        }

        this.camera.update(this.player.x, this.player.y);
    }

    keyPressed() {
        if (keyCode === 87 && this.player.grounded) {
            this.player.jump();
            jumpSound.play();
        } else if (keyCode === 83) {
            this.player.dropDownPlatform(this.tilemaps[this.mapIdx].cells);
        } else if (keyCode === 65) {
            this.player.direction = -1;
            this.player.facingRight = false;
        } else if (keyCode === 68) {
            this.player.direction = 1;
            this.player.facingRight = true;
        }
    }

    keyReleased() {
        if (keyCode === 87 && this.player.vy < 0) {
            this.player.vy *= 0.2;
        } else if (keyCode === 65 && this.player.direction < 0) {
            this.player.direction = 0;
        } else if (keyCode === 68 && this.player.direction > 0) {
            this.player.direction = 0;
        }
    }

    draw() {
        const shift_x = this.player.x - this.camera.x;
        const shift_y = this.player.y - this.camera.y;
        this.tilemaps[this.mapIdx].draw(shift_x, shift_y);
        this.player.draw(shift_x, shift_y);
    }
}