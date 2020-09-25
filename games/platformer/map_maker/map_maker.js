const width = 768 * 1.6;
const height = 352 * 3.2;
const unitLength = 32;
let spriteSheet;

function preload() {
    spriteSheet = loadImage('../assets/sprite_sheet.png');
}

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
}

function draw() {
    background(71, 45, 60);
    image(spriteSheet, 0, 352 * 1.6, 768 * 1.6, 352 * 1.6);
}