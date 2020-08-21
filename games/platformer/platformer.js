const unitLength = 40;
let spriteSheet;
let hierarchy;

function preload() {
    spriteSheet = loadImage('games/platformer/sprites.png');
}

function setup() {
    const canvas = createCanvas(tilemap.n * unitLength, tilemap.m * unitLength);
    canvas.parent("sketch-holder");
    hierarchy = [tilemap, player];
}

function keyPressed() {
    if (keyCode === 87 && player.grounded) {
        player.y -= 1;
        player.vy = -9;
        player.grounded = false;
    } else if (keyCode === 65) {
        player.direction = -1;
        player.facingRight = false;
    } else if (keyCode === 68) {
        player.direction = 1;
        player.facingRight = true;
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
    for (let i = 0; i < hierarchy.length; i++) {
        hierarchy[i].draw();
    }

    for (let i = 0; i < hierarchy.length; i++) {
        hierarchy[i].update();
    }
}