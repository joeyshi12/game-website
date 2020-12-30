class Button {
    constructor(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = 10*text.length;
        this.height = 20;
    }

    isHovering() {
        if (this.x < mouseX && mouseX < this.x + this.width) {
            if (this.y < mouseY && mouseY < this.y + this.height) {
                return true;
            }
        }
        return false;
    }

    draw() {
        push();
        if (this.isHovering()) {
            textSize(22);
            fill(255);
            text(this.text, this.x - this.text.length/2, this.y + this.height);
        } else {
            textSize(20);
            fill(255);
            text(this.text, this.x, this.y + this.height);
        }
        pop();
    }
}

class State {
    constructor() {
        this.buttons = {};
    }

    clickListener(manager) {
        throw new Error("Abstract method");
    }

    keyPressListener(manager) {
        throw new Error("Abstract method");
    }

    keyReleaseListener(manager) {
        throw new Error("Abstract method");
    }

    createButton(text, x, y) {
        this.buttons[text] = new Button(text, x, y);
    }

    draw(manager) {
        throw new Error("Abstract method");
    }
}

class StartMenu extends State {
    constructor() {
        super();
        this.createButton("start", width/2 - 25, height/2 - 16);
        this.createButton("options", width/2 - 35, height/2 + 16);
    }

    clickListener(manager) {
        if (this.buttons["start"].isHovering()) {
            manager.setState(new GameState());
        } else if (this.buttons["options"].isHovering()) {
            manager.setState(new OptionsMenu());
        }
    }

    keyPressListener(manager) {}

    keyReleaseListener(manager) {}

    draw(manager) {
        push();
        background(24, 24, 24);
        fill(255);
        textSize(32);
        text("Platformer", width/2 - 80, 180);
        pop();
        for (let button of Object.values(this.buttons)) {
            button.draw();
        }
    }
}

class OptionsMenu extends State {
    constructor() {
        super();
        this.awaitingFor = null;
        this.createButton("left", width/2 - 60, height/2 - 100);
        this.createButton("right", width/2 - 60, height/2 - 60);
        this.createButton("jump", width/2 - 60, height/2 - 20);
        this.createButton("drop", width/2 - 60, height/2 + 20);
        this.createButton("pause", width/2 - 60, height/2 + 60);
        this.createButton("back", width/2 - 60, height/2 + 100);
    }

    clickListener(manager) {
        if (this.buttons["left"].isHovering()) {
            this.awaitingFor = "left";
        } else if (this.buttons["right"].isHovering()) {
            this.awaitingFor = "right";
        } else if (this.buttons["jump"].isHovering()) {
            this.awaitingFor = "jump";
        } else if (this.buttons["drop"].isHovering()) {
            this.awaitingFor = "drop";
        } else if (this.buttons["pause"].isHovering()) {
            this.awaitingFor = "pause";
        } else if (this.buttons["back"].isHovering()) {
            manager.setState(new StartMenu());
        }
    }

    keyPressListener(manager) {
        if (this.awaitingFor) {
            manager.setKeyBinding(this.awaitingFor, key.toUpperCase());
        }
        this.awaitingFor = null;
    }

    keyReleaseListener(manager) {}

    draw(manager) {
        push();
        background(24, 24, 24);
        textSize(20);
        fill(255, 255, 255);
        push();
        textSize(32);
        text("Controls", width/2 - 64, 100);
        pop();
        push();
        if (this.awaitingFor === "left") {
            fill(255,255,0);
        }
        text(manager.getKeyBinding("left"), width/2 + 30, height/2-80);
        pop();
        push();
        if (this.awaitingFor === "right") {
            fill(255,255,0);
        }
        text(manager.getKeyBinding("right"), width/2 + 30, height/2-40);
        pop();
        push();
        if (this.awaitingFor === "jump") {
            fill(255,255,0);
        }
        text(manager.getKeyBinding("jump"), width/2 + 30, height/2);
        pop();
        push();
        if (this.awaitingFor === "drop") {
            fill(255,255,0);
        }
        text(manager.getKeyBinding("drop"), width/2 + 30, height/2+40);
        pop();
        push();
        if (this.awaitingFor === "pause") {
            fill(255,255,0);
        }
        text(manager.getKeyBinding("pause"), width/2 + 30, height/2+80);
        pop();
        for (let button of Object.values(this.buttons)) {
            button.draw();
        }
        pop();
    }
}

class GameState extends State {
    constructor() {
        super();
        this.map = map1;
        this.player = new Player(100, 485);
        this.enemies = [new Ghost(800, 220, this.player)];
        this.startTime = Date.now();
        this.deltaTime = 0;
        this.paused = false;
        this.gemAngle = 0;
        this.createButton("reset", width / 2 - 25, 140);
        this.createButton("exit", width / 2 - 20, 170);
    }

    reset() {
        this.map = map1;
        this.player = new Player(100, 485);
        this.enemies = [new Ghost(800, 220, this.player)];
        this.startTime = Date.now();
        if (!this.finished) {
            this.deltaTime = 0;
        }
    }

    handleMapTransition() {
        if (this.map.rightMap && this.player.x > this.map.numCols * unitLength - 10) {
            this.map = this.map.rightMap;
            this.player.x = -10;
            if (this.map === map1) {
                this.enemies = [new Ghost(800, 220, this.player)];
            } else {
                this.enemies = [];
            }
        } else if (this.map.leftMap && this.player.x + this.player.width - 10 < 0) {
            this.map = this.map.leftMap;
            this.player.x = this.map.numCols * unitLength - 10;
            if (this.map === map1) {
                this.enemies = [new Ghost(800, 220, this.player)];
            } else {
                this.enemies = [];
            }
        }
    }

    update() {
        this.handleMapTransition();
        let i = Math.floor((this.player.y + this.player.height/2) / unitLength);
        let j = Math.floor((this.player.x + this.player.width/2) / unitLength);
        if (this.map.getTile(i, j) === 22) {
            this.player.setDead();
        }
        this.player.update(this.map);
        this.enemies.forEach((ghost) => {
            if (ghost.collide(this.player)) {
                this.player.setDead();
            }
            ghost.update();
        });
        if (!this.finished) {
            this.deltaTime = Date.now() - this.startTime;
        }
        if (i === 4 && j === 37 && this.map === map2) {
            this.finished = true;
        }
        camera.update(this.player.x, this.player.y);
    }

    clickListener(manager) {
        if (this.paused) {
            if (this.buttons["reset"].isHovering()) {
                this.reset();
                this.paused = false;
                this.finished = false;
            } else if (this.buttons["exit"].isHovering()) {
                manager.setState(new StartMenu());
            }
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
                this.paused = !this.paused;
        }
    }

    keyReleaseListener(manager) {
        if (key.toUpperCase() === manager.getKeyBinding("jump") && this.player.vy < 0) {
            this.player.vy *= 0.3;
        } else if (key.toUpperCase() === manager.getKeyBinding("left") && this.player.direction < 0) {
            this.player.direction = 0;
        } else if (key.toUpperCase() === manager.getKeyBinding("right") && this.player.direction > 0) {
            this.player.direction = 0;
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
        image(spriteSheet, x2-camera.x, y2+-camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
        const x3 = x - unitLength*Math.cos(this.gemAngle);
        const y3 = y - unitLength*Math.sin(this.gemAngle);
        image(spriteSheet, x3-camera.x, y3+-camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
        const x4 = x + unitLength*Math.sin(this.gemAngle);
        const y4 = y - unitLength*Math.cos(this.gemAngle);
        image(spriteSheet, x4-camera.x, y4+-camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
    }

    drawPauseMenu() {
        push();
        fill(255);
        rect(width/2-75, 70, 150, 150);
        fill(0);
        rect(width/2-70, 75, 140, 140);
        stroke(1);
        textSize(32);
        fill(255);
        text("Paused", width/2-48, 120);
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
            this.drawTimer();
            if (this.finished && this.map === map2) {
                this.drawWinAnimation();
            }
            pop();
        }
    }
}
