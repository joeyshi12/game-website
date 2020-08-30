class Button {
    constructor(x, y, width, height, text) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.hovering = false;
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
        if (this.isHovering()) {
            textSize(22);
            fill(255, 255, 255);
            text(this.text, this.x + 10, this.y + this.height * 0.7);
        } else {
            textSize(20);
            fill(255, 255, 255);
            text(this.text, this.x + 12, this.y + this.height * 0.7);
        }
    }
}

class Page {
    constructor() {
        this.buttons = [];
    }

    createButton(x, y, width, height, title) {
        this.buttons.push(new Button(x, y, width, height, title));
    }

    draw() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw();
        }
    }
}