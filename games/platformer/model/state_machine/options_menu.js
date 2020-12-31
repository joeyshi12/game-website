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

    drawMoveRow(move, key, row) {
        this.buttons[move].draw();
        push();
        if (this.awaitingFor === move) {
            fill(255, 255, 0);
        }
        text(key, width/2 + 30, height/2 - 80 + 40 * row);
        pop();
    }

    draw(manager) {
        push();
        background(24, 24, 24);
        textSize(20);
        fill(255, 255, 255);
        push();
        textSize(32);
        text("Controls", width/2 - 64, 100);
        pop();
        this.drawMoveRow("left", manager.getKeyBinding("left"), 0);
        this.drawMoveRow("right", manager.getKeyBinding("right"), 1);
        this.drawMoveRow("jump", manager.getKeyBinding("jump"), 2);
        this.drawMoveRow("drop", manager.getKeyBinding("drop"), 3);
        this.drawMoveRow("pause", manager.getKeyBinding("pause"), 4);
        this.buttons["back"].draw();
    }
}