const numRows = 30;
const numCols = 30;
const unitLength = 24;
const width = 48*unitLength;
const height = (22 + numRows)*unitLength;
let spriteSheet;
const selected = [0, 0];
let data = [];


function preload() {
    spriteSheet = loadImage('../assets/sprite_sheet.png');
}

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            data[i*numCols + j] = 0;
        }
    }
}

function keyPressed() {
    if (keyCode === 13) {
        const inputText = document.getElementById("import");
        let dataStr = inputText.value;
        let newData = dataStr.split(",");
        try {
            newData = newData.map((i) => +i);
        } catch (e) {
            return;
        }
        if (newData.length !== numRows*numCols) {
            return;
        }
        data = newData;
    } else if (keyCode === 32) {
        const inputText = document.getElementById("export");
        inputText.value = data.toString();
        inputText.select();
        inputText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("Map data copied to clipboard");
    }
}

function mousePressed() {
    console.log(mouseX, mouseY);
    if (mouseY < 22*unitLength) {
        selected[0] = Math.floor(mouseX/unitLength);
        selected[1] = Math.floor(mouseY/unitLength);
    }
}

function mouseDragged() {
    if (mouseY >= 22*unitLength && mouseY < 22*unitLength + numRows*unitLength) {
        if (mouseX < numCols*unitLength) {
            const i = Math.floor((mouseY-22*unitLength)/unitLength);
            const j = Math.floor(mouseX/unitLength);
            data[i*numCols + j] = selected[1]*48 + selected[0];
        }
    }
}

function drawData() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const x = j * unitLength;
            const y = i * unitLength;
            const sx = (data[i*numCols + j] % 48) * 16;
            const sy = Math.floor(data[i*numCols + j] / 48) * 16;
            image(spriteSheet, x, y + 22*unitLength, unitLength, unitLength, sx, sy, 15.5, 16);
        }
    }
}

function draw() {
    background(0);
    push();
    fill(71, 45, 60);
    rect(0, 22*unitLength,numCols*unitLength, numRows*unitLength);
    pop();
    push();
    fill(100, 100, 60);
    rect(selected[0]*unitLength, selected[1]*unitLength, unitLength, unitLength);
    pop();
    drawData();
    image(spriteSheet, 0, 0, width, 22*unitLength);
}