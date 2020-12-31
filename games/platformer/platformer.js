let canvas;
let inconsolata, spriteSheet, jumpSound, landSound;
let camera, maps;
let gameManager;

function preload() {
    inconsolata = loadFont('games/platformer/assets/inconsolata.otf');
    spriteSheet = loadImage('games/platformer/assets/sprite_sheet.png');
    jumpSound = loadSound('games/platformer/assets/jump.mp3');
    landSound = loadSound('games/platformer/assets/land.mp3');
    clickSound = loadSound('games/platformer/assets/click.mp3');
    pauseSound = loadSound('games/platformer/assets/pause.mp3');
}

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
    canvas.center('horizontal');
    textFont(inconsolata);
    camera = new Camera(width / 2, height / 2, 0, 40 * unitLength, 0, 20 * unitLength);
    maps = [new Map(data0, 20, 40), new Map(data1, 20, 40), new Map(data2, 20, 40), new Map(data3, 30, 30)];
    maps[0].setRightMap(maps[1]);
    maps[1].setRightMap(maps[2]);
    maps[2].setRightMap(maps[3]);
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