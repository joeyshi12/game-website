class GameState extends State {
    constructor() {
        super();
        this.map = map1;
        this.player = new Player(100, 15 * unitLength + 9);
        this.spawnEnemies();
        this.projectiles = [];
        this.startTime = Date.now();
        this.deltaTime = 0;
        this.paused = false;
        this.gemAngle = 0;
        this.createButton("reset", width / 2 - 25, 140);
        this.createButton("exit", width / 2 - 20, 170);
        this.deadTimer = 120;
    }

    reset() {
        this.map = map1;
        this.player = new Player(100, 15 * unitLength + 9);
        this.spawnEnemies();
        this.startTime = Date.now();
        this.deltaTime = 0;
        this.finished = false;
    }

    fillEnemies(positions) {
        for (let position of positions) {
            this.enemies.push(new Ghost(position[0], position[1], this.player));
        }
    }

    spawnEnemies() {
        this.enemies = [];
        switch (this.map) {
            case map0:
                this.fillEnemies(enemyPositions0);
                break;
            case map1:
                this.fillEnemies(enemyPositions1);
                break;
            case map2:
                this.fillEnemies(enemyPositions2);
        }
    }

    handleMapTransition() {
        if (this.map.rightMap && this.player.x > this.map.numCols * unitLength - 10) {
            this.map = this.map.rightMap;
            this.player.x = -10;
            this.spawnEnemies();
        } else if (this.map.leftMap && this.player.x + this.player.width - 10 < 0) {
            this.map = this.map.leftMap;
            this.player.x = this.map.numCols * unitLength - 10;
            this.spawnEnemies();
        }
    }

    updateGameStatus() {
        const i = Math.floor((this.player.y + this.player.height/2) / unitLength);
        const j = Math.floor((this.player.x + this.player.width/2) / unitLength);
        if (this.map.getTile(i, j) === 22) {
            this.player.isDead = true;
        }
        this.enemies.forEach((ghost) => {
            if (ghost.collide(this.player)) {
                this.player.isDead = true;
            }
        });
        if (!this.finished) {
            this.deltaTime = Date.now() - this.startTime;
        }
        if (i === 4 && j === 37 && this.map === map2) {
            this.finished = true;
        }
    }

    update() {
        this.handleMapTransition();
        if (this.player.isDead) {
            this.deadTimer--;
        }
        if (this.deadTimer <= 0) {
            this.reset();
            this.deadTimer = 120;
        }
        this.player.update(this.map);
        this.enemies.forEach((ghost) => {
            ghost.update();
        });
        this.projectiles.forEach((projectile) => {
            projectile.update();
        });
        this.updateGameStatus();
        camera.update(this.player.x, this.player.y);
    }

    clickListener(manager) {
        if (this.paused) {
            if (this.buttons["reset"].isHovering()) {
                clickSound.play();
                this.reset();
                this.paused = false;
                this.finished = false;
            } else if (this.buttons["exit"].isHovering()) {
                clickSound.play();
                manager.setState(new StartMenu());
            }
        } else {
            // const dx = mouseX - this.player.x + camera.x;
            // const dy = mouseY - this.player.y + camera.y;
            // const r = Math.sqrt(dx**2 + dy**2);
            // const dir_x = dx / r;
            // const dir_y = dy / r;
            // this.projectiles.push(new FireBall(this.player.x, this.player.y, dir_x, dir_y));
        }
    }

    keyPressListener(manager) {
        switch (key.toUpperCase()) {
            case manager.getKeyBinding("left"):
                this.player.moveLeft();
                break;
            case manager.getKeyBinding("right"):
                this.player.moveRight();
                break;
            case manager.getKeyBinding("jump"):
                this.player.jump();
                break;
            case manager.getKeyBinding("drop"):
                this.player.dropDownPlatform(this.map);
                break;
            case "ESCAPE":
                if (!this.paused) {
                    pauseSound.play();
                }
                this.paused = !this.paused;
        }
    }

    keyReleaseListener(manager) {
        switch (key.toUpperCase()) {
            case manager.getKeyBinding("left"):
                if (this.player.direction === -1) {
                    this.player.direction = 0;
                }
                break;
            case manager.getKeyBinding("right"):
                if (this.player.direction === 1) {
                    this.player.direction = 0;
                }
                break;
            case manager.getKeyBinding("jump"):
                if (this.player.vy < 0) {
                    this.player.vy *= 0.3;
                }
        }
    }

    drawTimer() {
        push();
        fill(255);
        textSize(22);
        text("Timer: " + this.deltaTime/1000, 540, 40);
        pop();
    }

    drawWinAnimation() {
        this.gemAngle += 0.08;
        const x = 37*unitLength;
        const y = 4*unitLength;
        const x1 = x + unitLength*Math.cos(this.gemAngle);
        const y1 = y + unitLength*Math.sin(this.gemAngle);
        image(spriteSheet, x1-camera.x, y1-camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
        const x2 = x - unitLength*Math.sin(this.gemAngle);
        const y2 = y + unitLength*Math.cos(this.gemAngle);
        image(spriteSheet, x2-camera.x, y2-camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
        const x3 = x - unitLength*Math.cos(this.gemAngle);
        const y3 = y - unitLength*Math.sin(this.gemAngle);
        image(spriteSheet, x3-camera.x, y3-camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
        const x4 = x + unitLength*Math.sin(this.gemAngle);
        const y4 = y - unitLength*Math.cos(this.gemAngle);
        image(spriteSheet, x4-camera.x, y4-camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
    }

    drawPauseMenu() {
        push();
        fill(255);
        rect(width/2 - 75, 70, 150, 150);
        fill(0);
        rect(width/2 - 70, 75, 140, 140);
        stroke(1);
        textSize(32);
        fill(255);
        text("Paused", width/2 - 48, 120);
        pop();
        for (let button of Object.values(this.buttons)) {
            button.draw();
        }
    }

    draw(manager) {
        if (this.paused) {
            this.startTime = Date.now() - this.deltaTime;
            this.drawPauseMenu();
        } else {
            this.update();
            push();
            background(71, 45, 60);
            this.map.draw();
            this.player.draw();
            this.enemies.forEach((ghost) => {
                ghost.draw();
            });
            this.projectiles.forEach((projectile) => {
                projectile.draw();
            });
            this.drawTimer();
            if (this.finished && this.map === map2) {
                this.drawWinAnimation();
            }
            pop();
        }
    }
}