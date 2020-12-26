class GameManager {
    constructor() {
        this.camera = new Camera(width / 2, height / 2, n * unitLength);
        this.tilemaps = [new Tilemap(cells1, m, n), new Tilemap(cells2, m, n)];
        this.mapIdx = 0;
        this.player = new Player(120, 100);
        this.enemies = [new Ghost(800, 220, this.player)];
    }

    update() {
        if (this.mapIdx === 0 && this.player.x > n * unitLength - 10) {
            this.mapIdx = 1;
            this.player.x = -10;
        } else if (this.mapIdx === 1 && this.player.x + this.player.width - 10 < 0) {
            this.mapIdx = 0;
            this.player.x = n * unitLength - 10;
        }

        if (this.player.isDead(this.tilemaps[this.mapIdx].cells)) {
            this.player.x = 120;
            this.player.y = 100;
            this.player.vx = 0;
            this.player.vy = 0;
            this.enemies = [new Ghost(800, 220, this.player)];
        } else {
            this.player.update(this.tilemaps[this.mapIdx].cells);
        }

        // for (let i = 0; i < this.hierarchy.length; i++) {
        //     this.hierarchy[i].update();
        // }
        this.enemies.forEach((ghost) => {
            if (ghost.collide(this.player)) {
                this.player.x = 120;
                this.player.y = 100;
                this.player.vx = 0;
                this.player.vy = 0;
                this.enemies = [new Ghost(800, 220, this.player)];
            }
            ghost.update();
        });

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
            this.player.vy *= 0.3;
        } else if (keyCode === 65 && this.player.direction < 0) {
            this.player.direction = 0;
        } else if (keyCode === 68 && this.player.direction > 0) {
            this.player.direction = 0;
        }
    }

    mousePressed() {
    //     const dx = mouseX - this.camera.js.x;
    //     const dy = mouseY - this.camera.js.y;
    //     const direction_x = dx / Math.sqrt(dx ** 2 + dy ** 2);
    //     const direction_y = dy / Math.sqrt(dx ** 2 + dy ** 2);
    //     this.hierarchy.push(new FireBall(this.player.x, this.player.y, direction_x, direction_y));
    //     this.player.vx -= 5 * dx / Math.sqrt(dx ** 2 + dy ** 2);
    //     this.player.vy -= 5 * dy / Math.sqrt(dx ** 2 + dy ** 2);
    }

    draw() {
        const shift_x = this.camera.x;
        const shift_y = this.camera.y;
        this.tilemaps[this.mapIdx].draw(shift_x, shift_y);
        this.player.draw(shift_x, shift_y);
        this.enemies.forEach((ghost) => {
            ghost.draw(shift_x, shift_y);
        });
    }
}