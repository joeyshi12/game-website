const width = 700;
const height = 450;
let canvas;
let inconsolata, spriteSheet, jumpSound, landSound;
let gameManager;

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
    gameManager = new GameManager();
}

function windowResized() {
    canvas.center('horizontal');
}

function keyPressed() {
    gameManager.getState().keyPressListener(gameManager);
}

function keyReleased() {
    gameManager.getState().keyReleaseListener(gameManager);
}

function mousePressed() {
    gameManager.getState().clickListener(gameManager);
}

function draw() {
    gameManager.getState().draw(gameManager);
}