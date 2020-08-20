const unitLength = 40;
let spriteSheet;

function preload() {
    spriteSheet = loadImage('games/platformer/sprites.png');
}

function setup() {
    var canvas = createCanvas(tilemap.n * unitLength, tilemap.m * unitLength);
    canvas.parent("sketch-holder");
}

function keyPressed() {
    if (keyCode === 87 && player.grounded) {
        player.y -= 1;
        player.vy = -8;
        player.grounded = false;
    } else if (keyCode === 65) {
        player.direction = -1;
    } else if (keyCode === 68) {
        player.direction = 1;
    }
}

function keyReleased() {
    if (keyCode === 65 && player.direction < 0) {
        player.direction = 0;
    } else if (keyCode === 68 && player.direction > 0) {
        player.direction = 0;
    }
}

function draw() {
    background(71, 45, 60);
    tilemap.draw();
    player.draw();
    player.update();
}