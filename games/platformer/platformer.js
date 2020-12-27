const width = 600;
const height = 400;
const unitLength = 32;
let canvas;
let inconsolata, spriteSheet, jumpSound, landSound;
let gameManager;
let startMenu;
let started = false;
let paused = false;
let state = "menu"
const keyBindings = {"left": 65, "jump": 87, "right": 68, "drop": 83};

function preload() {
    inconsolata = loadFont('games/platformer/assets/inconsolata.otf');
    spriteSheet = loadImage('games/platformer/assets/sprite_sheet.png');
    jumpSound = loadSound('games/platformer/assets/jump.mp3');
    landSound = loadSound('games/platformer/assets/land.mp3');
}

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
    canvas.center('horizontal');
    textFont(inconsolata);
    startMenu = new Page();
    startMenu.createButton((width - 80) / 2, height / 2, 80, 32, "start");
    startMenu.createButton((width - 150) / 2, height / 2 + 30, 150, 32, "key bindings");
    optionsMenu = new Page();
    optionsMenu.createButton((width - 80) / 2, height / 2, 80, 32, "left");
    optionsMenu.createButton((width - 80) / 2, height / 2 + 30, 150, 32, "right");
    optionsMenu.createButton((width - 80) / 2, height / 2 + 60, 80, 32, "jump");
    optionsMenu.createButton((width - 80) / 2, height / 2 + 90, 150, 32, "drop");
    gameManager = new GameManager();
}

function windowResized() {
    canvas.center('horizontal');
}

function keyPressed() {
    if (keyCode === 27 && state === "main") {
        paused = !paused;
    }
    if (!paused) {
        gameManager.keyPressed();
    }
}

function keyReleased() {
    gameManager.keyReleased();
}

function mousePressed() {
    if (startMenu.buttons[0].isHovering() && state === "menu") {
        state = "game";
    }
    gameManager.mousePressed();
}

let timer = 0;

function draw() {
    if (state === "menu") {
        background(24, 24, 24);
        textSize(32);
        fill(255, 255, 255);
        text("Platformer", 220, 180);
        startMenu.draw();
    } else if (state === "options") {
        background(24, 24, 24);
        textSize(32);
        fill(255, 255, 255);
        optionsMenu.bu
        optionsMenu.draw();
    } else {
        background(71, 45, 60);
        if (paused) {
            text("PAUSED", width / 2 - 30, height / 2);
            gameManager.draw();
            text("PAUSED", width / 2 - 30, height / 2);
        } else {
            gameManager.update();
            gameManager.draw();
        }
        text("Timer:" + Math.floor(10 * timer / 6) / 100, 450, 50);
        timer += 1;
    }
}