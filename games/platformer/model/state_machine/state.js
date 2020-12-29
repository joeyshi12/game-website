class Button {
    constructor(text, x, y, height, width) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
            fill(255, 255, 255);
            text(this.text, this.x+10, this.y + this.height * 0.7);
        } else {
            textSize(20);
            fill(255, 255, 255);
            text(this.text, this.x+12, this.y + this.height * 0.7);
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

    createButton(text, x, y, width, height) {
        this.buttons[text] = new Button(text, x, y, height, width);
    }

    draw(manager) {
        throw new Error("Abstract method");
    }
}

class StartMenu extends State {
    constructor() {
        super();
        this.createButton("start",300,height/2-16,80,32);
        this.createButton("options",290,height/2+16,100,32);
    }

    clickListener(manager) {
        if (this.buttons["start"].isHovering()) {
            manager.setState(new GameState());
        } else if (this.buttons["options"].isHovering()) {
            manager.setState(new OptionsMenu());
        }
    }

    KeyPressListener(manager) {}

    KeyReleaseListener(manager) {}

    draw(manager) {
        push();
        background(24, 24, 24);
        textSize(32);
        fill(255, 255, 255);
        push();
        textAlign(CENTER);
        text("Platformer", 0, 180, width);
        pop();
        for (let button of Object.values(this.buttons)) {
            button.draw();
        }
        pop();
    }
}

class OptionsMenu extends State {
    constructor() {
        super();
        this.awaitingFor = null;
        this.createButton("left",width/2-80,height/2-60,70,32);
        this.createButton("right",width/2-80,height/2-20,80,32);
        this.createButton("jump",width/2-80,height/2+20,70,32);
        this.createButton("drop",width/2-80,height/2+60,70,32);
        this.createButton("back",width/2-80,height/2+100,70,32);
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
        textAlign(CENTER);
        text("Key Bindings", 0, 140, width);
        pop();
        push();
        if (this.awaitingFor === "left") {
            fill(255,255,0);
        }
        text(manager.getKeyBinding("left"), 360, 187);
        pop();
        push();
        if (this.awaitingFor === "right") {
            fill(255,255,0);
        }
        text(manager.getKeyBinding("right"), 360, 227);
        pop();
        push();
        if (this.awaitingFor === "jump") {
            fill(255,255,0);
        }
        text(manager.getKeyBinding("jump"), 360, 267);
        pop();
        push();
        if (this.awaitingFor === "drop") {
            fill(255,255,0);
        }
        text(manager.getKeyBinding("drop"), 360, 307);
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
        this.camera = new Camera(width / 2, height / 2, n * unitLength);
        this.tilemaps = [new Tilemap(cells1, m, n, this.camera), new Tilemap(cells2, m, n, this.camera)];
        this.mapIdx = 0;
        this.player = new Player(100, 549, this.camera);
        this.enemies = [new Ghost(800, 220, this.camera, this.player)];
        this.startTime = Date.now();
        this.deltaTime = 0;
        this.paused = false;
        this.gemAngle = 0;
        this.createButton("reset", width/2-30, 100, 80, 32);
        this.createButton("exit", width/2-25, 135, 70, 32);
    }

    reset() {
        this.mapIdx = 0;
        this.player = new Player(100, 549, this.camera);
        this.enemies = [new Ghost(800, 220, this.camera, this.player)];
        this.startTime = Date.now();
        this.deltaTime = 0;
    }

    update() {
        if (this.mapIdx === 0 && this.player.x > n * unitLength - 10) {
            this.mapIdx = 1;
            this.player.x = -10;
            this.enemies = [];
        } else if (this.mapIdx === 1 && this.player.x + this.player.width - 10 < 0) {
            this.mapIdx = 0;
            this.player.x = n * unitLength - 10;
            this.enemies = [new Ghost(800, 220, this.camera, this.player)];
        }

        if (this.player.isDead(this.tilemaps[this.mapIdx].cells)) {
            this.reset();
        } else {
            this.player.update(this.tilemaps[this.mapIdx].cells);
        }

        if (!this.finished) {
            this.deltaTime = Date.now() - this.startTime;
        }

        this.enemies.forEach((ghost) => {
            if (ghost.collide(this.player)) {
                this.reset();
            }
            ghost.update();
        });

        const player_x_center = Math.floor((this.player.x+this.player.width/2)/unitLength);
        const player_y_center = Math.floor((this.player.y+this.player.height/2)/unitLength);
        if (player_x_center === 37 && player_y_center === 4 && this.mapIdx === 1) {
            this.finished = true;
        }

        this.camera.update(this.player.x, this.player.y);
    }

    clickListener(manager) {
        if (this.paused) {
            if (this.buttons["reset"].isHovering()) {
                this.reset();
                this.paused = false;
            } else if (this.buttons["exit"].isHovering()) {
                manager.setState(new StartMenu());
            }
        }
    }

    keyPressListener(manager) {
        switch (key.toUpperCase()) {
            case manager.getKeyBinding("left"):
                this.player.direction = -1;
                this.player.facingRight = false;
                break;
            case manager.getKeyBinding("right"):
                this.player.direction = 1;
                this.player.facingRight = true;
                break;
            case manager.getKeyBinding("jump"):
                if (this.player.grounded) {
                    this.player.jump();
                    jumpSound.play();
                }
                break;
            case manager.getKeyBinding("drop"):
                this.player.dropDownPlatform(this.tilemaps[this.mapIdx].cells);
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
        image(spriteSheet, x1-this.camera.x, y1-this.camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
        const x2 = x - unitLength*Math.sin(this.gemAngle);
        const y2 = y + unitLength*Math.cos(this.gemAngle);
        image(spriteSheet, x2-this.camera.x, y2+-this.camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
        const x3 = x - unitLength*Math.cos(this.gemAngle);
        const y3 = y - unitLength*Math.sin(this.gemAngle);
        image(spriteSheet, x3-this.camera.x, y3+-this.camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
        const x4 = x + unitLength*Math.sin(this.gemAngle);
        const y4 = y - unitLength*Math.cos(this.gemAngle);
        image(spriteSheet, x4-this.camera.x, y4+-this.camera.y, unitLength-8, unitLength-8, 33 * 16 + 1, 10 * 16 + 2, 14, 13);
    }

    draw(manager) {
        if (this.paused) {
            this.startTime = Date.now() - this.deltaTime;
            push();
            fill(0);
            rect(width/2-60, 20, 135, 160);
            for (let button of Object.values(this.buttons)) {
                button.draw();
            }
            stroke(1);
            textSize(32);
            fill(255);
            text("Paused", width/2-40, 60);
            pop();
        } else {
            this.update();
            push();
            background(71, 45, 60);
            this.tilemaps[this.mapIdx].draw();
            this.player.draw();
            this.enemies.forEach((ghost) => {
                ghost.draw();
            });
            this.drawTimer();
            if (this.finished && this.mapIdx === 1) {
                this.drawWinAnimation();
            }
            pop();
        }
    }
}
