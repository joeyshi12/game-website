const width = 600;
const height = 400;
const unitLength = 32;
let inconsolata, spriteSheet, jumpSound, landSound;
let gameRun;
let startMenu;
let started = false;
let paused = false;

function preload() {
    inconsolata = loadFont('games/platformer/assets/inconsolata.otf');
    spriteSheet = loadImage('games/platformer/assets/sprites.png');
    jumpSound = loadSound('games/platformer/assets/jump.mp3');
    landSound = loadSound('games/platformer/assets/land.mp3');
}

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
    textFont(inconsolata);
    startMenu = new Page();
    startMenu.createButton((width - 80) / 2, height / 2, 80, 32, "start");
    gameRun = new GameRun();
}

function keyPressed() {
    if (keyCode === 27 && started) {
        paused = !paused;
    }

    if (!paused) {
        gameRun.keyPressed();
    }
}

function keyReleased() {
    gameRun.keyReleased();
}

function mousePressed() {
    if (startMenu.buttons[0].isHovering()) {
        started = true;
    }
}

function draw() {
    if (started) {
        background(71, 45, 60);
        if (paused) {
            text("PAUSED", width / 2 - 30, height / 2);
            gameRun.draw();
            text("PAUSED", width / 2 - 30, height / 2);
        } else {
            gameRun.update();
            gameRun.draw();
        }
    } else {
        background(24, 24, 24);
        textSize(32);
        fill(255, 255, 255);
        text("A Cold Place", 200, 180);
        startMenu.draw();
    }
}