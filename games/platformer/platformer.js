const width = 600;
const height = 400;
const unitLength = 36;
let spriteSheet;
let hierarchy;
let jumpSound, landSound;

function preload() {
    spriteSheet = loadImage('games/platformer/sprites.png');
    jumpSound = loadSound('games/platformer/jump.mp3');
    landSound = loadSound('games/platformer/land.mp3');
}

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
    hierarchy = [tilemap, player];
}

function keyPressed() {
    if (keyCode === 87 && player.grounded) {
        player.y -= 1;
        player.vy = -9;
        player.grounded = false;
        jumpSound.play();
    } else if (keyCode === 83) {
        player.dropDownPlatform();
    } else if (keyCode === 65) {
        player.direction = -1;
        player.facingRight = false;
    } else if (keyCode === 68) {
        player.direction = 1;
        player.facingRight = true;
    }
}

function keyReleased() {
    if (keyCode === 87 && player.vy < 0) {
        player.vy *= 0.2;
    } else if (keyCode === 65 && player.direction < 0) {
        player.direction = 0;
    } else if (keyCode === 68 && player.direction > 0) {
        player.direction = 0;
    }
}

function draw() {
    background(71, 45, 60);
    for (let i = 0; i < hierarchy.length; i++) {
        hierarchy[i].draw();
    }

    for (let i = 0; i < hierarchy.length; i++) {
        hierarchy[i].update();
    }

    camera.update();
}