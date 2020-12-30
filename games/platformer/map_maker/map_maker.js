const rows = 20;
const columns = 40;
const unitLength = 24;
const width = 48*unitLength;
const height = (22 + rows)*unitLength;
let spriteSheet;
const selected = [0, 0];
let data = [];


function preload() {
    spriteSheet = loadImage('../assets/sprite_sheet.png');
}

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            data[i*columns + j] = 0;
        }
    }
}

function keyPressed() {
    if (keyCode === 32) {
        const inputText = document.getElementById("myInput");
        inputText.value = "[" + data.toString() + "]";
        inputText.select();
        inputText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("Map data copied to clipboard");
    }
}

function mousePressed() {
    if (mouseY < 22*unitLength) {
        selected[0] = Math.floor(mouseX/unitLength);
        selected[1] = Math.floor(mouseY/unitLength);
    }
}

function mouseDragged() {
    if (mouseY >= 22*unitLength && mouseY < 22*unitLength + rows*unitLength) {
        if (mouseX < columns*unitLength) {
            const i = Math.floor((mouseY-22*unitLength)/unitLength);
            const j = Math.floor(mouseX/unitLength);
            data[i*columns + j] = selected[1]*48 + selected[0];
        }
    }
}

function drawData() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const x = j * unitLength;
            const y = i * unitLength;
            const sx = (data[i*columns + j] % 48) * 16;
            const sy = Math.floor(data[i*columns + j] / 48) * 16;
            image(spriteSheet, x, y + 22*unitLength, unitLength, unitLength, sx, sy, 15.5, 16);
        }
    }
}

function draw() {
    background(0);
    push();
    fill(71, 45, 60);
    rect(0, 22*unitLength, columns*unitLength, rows*unitLength);
    pop();
    push();
    fill(100, 100, 60);
    rect(selected[0]*unitLength, selected[1]*unitLength, unitLength, unitLength);
    pop();
    drawData();
    image(spriteSheet, 0, 0, width, 22*unitLength);
}