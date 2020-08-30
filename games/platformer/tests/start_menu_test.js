const width = 600;
const height = 400;
let inconsolata;
let start_menu;

function preload() {
    inconsolata = loadFont('../assets/inconsolata.otf');
}

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
    textFont(inconsolata);
    start_menu = new Page();
    start_menu.createButton((width - 100) / 2, height / 2 - 10, 100, 32, "start");
    start_menu.createButton((width - 100) / 2, height / 2 + 20, 100, 32, "credits");
}

function mouseClicked() {
    for (let i = 0; i < start_menu.buttons.length; i++) {
        const button = start_menu.buttons[i];
        if (button.isHovering()) {
            console.log(button.text);
        }
    }
}

function draw() {
    background(24, 24, 24);
    textSize(32);
    fill(255, 255, 255);
    text("A Cold Place", 200, 160);
    start_menu.draw();
}