class Button {
    constructor(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = 10 * text.length;
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
