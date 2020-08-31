const width = 700;
const height = 500;
let topWall = new RigidBody(0, 0, width - 51, 50, mass = Infinity);
let bottomWall = new RigidBody(51, height - 50, width - 51, 50, mass = Infinity);
let rightWall = new RigidBody(width - 50, 0, 50, height - 51, mass = Infinity);
let leftWall = new RigidBody(0, 51, 50, height - 51, mass = Infinity);
let rb1 = new RigidBody(100, 100, 50, 50, mass = 5);
let rb2 = new RigidBody(300, 100, 50, 50, mass = 5);
let rb3 = new RigidBody(100, 250, 50, 70, mass = 10);

const unitLength = 0;
let camera;
let player;

let ax = 0;
let ay = 0;
let curr_body = 4;

let rbList = [topWall, bottomWall, rightWall, leftWall, rb1, rb2, rb3];

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
}

function mouseClicked() {
    for (let i = 4; i < rbList.length; i++) {
        if (rbList[i].x < mouseX && mouseX < rbList[i].x + rbList[i].width) {
            if (rbList[i].y < mouseY && mouseY < rbList[i].y + rbList[i].height) {
                curr_body = i;
                return;
            }
        }
    }
}

function keyPressed() {
    if (keyCode === 87) {
        ay = -0.2;
    } else if (keyCode === 83) {
        ay = 0.2;
    } else if (keyCode === 68) {
        ax = 0.2;
    } else if (keyCode === 65) {
        ax = -0.2;
    }
}

function keyReleased() {
    if (keyCode === 87 && ay < 0) {
        ay = 0;
    } else if (keyCode === 83 && ay > 0) {
        ay = 0;
    } else if (keyCode === 68 && ax > 0) {
        ax = 0;
    } else if (keyCode === 65 && ax < 0) {
        ax = 0;
    }
}

function draw() {
    background(0);
    for (let i = 0; i < rbList.length; i++) {
        if (curr_body === i) {
            fill(0, 255, 0);
            rect(rbList[i].x, rbList[i].y, rbList[i].width, rbList[i].height);
        } else {
            rbList[i].draw();
        }
    }

    for (let i = 0; i < rbList.length; i++) {
        for (let j = i + 1; j < rbList.length; j++) {
            if (rbList[i].collide(rbList[j])) {
                rbList[i].resolveCollision(rbList[j]);
                console.log("HIT");
            }
        }
    }

    for (let i = 0; i < rbList.length; i++) {
        rbList[i].update()
    }

    rbList[curr_body].vx += ax;
    rbList[curr_body].vy += ay;
}