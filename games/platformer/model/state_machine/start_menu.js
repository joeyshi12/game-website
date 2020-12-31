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