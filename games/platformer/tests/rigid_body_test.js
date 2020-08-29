const width = 700;
const height = 500;
let top_wall = new RigidBody(0, 0, width - 51, 50, mass = Infinity);
let bottom_wall = new RigidBody(51, height - 50, width - 51, 50, mass = Infinity);
let right_wall = new RigidBody(width - 50, 0, 50, height - 51, mass = Infinity);
let left_wall = new RigidBody(0, 51, 50, height - 51, mass = Infinity);
let rb1 = new RigidBody(100, 100, 50, 50, mass = 5);
let rb2 = new RigidBody(300, 100, 50, 50, mass = 5);
let rb3 = new RigidBody(100, 250, 50, 70, mass = 10);

const unitLength = 0;
let camera;
let player;

let ax = 0;
let ay = 0;
let curr_body = 4;

let rb_list = [top_wall, bottom_wall, right_wall, left_wall, rb1, rb2, rb3];

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
    camera = new Camera(0, 0);
    player = new Player(0, 0);
}

function mouseClicked() {
    for (let i = 4; i < rb_list.length; i++) {
        if (rb_list[i].x < mouseX && mouseX < rb_list[i].x + rb_list[i].width) {
            if (rb_list[i].y < mouseY && mouseY < rb_list[i].y + rb_list[i].height) {
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
    for (let i = 0; i < rb_list.length; i++) {
        if (curr_body === i) {
            fill(0, 255, 0);
            rect(rb_list[i].x, rb_list[i].y, rb_list[i].width, rb_list[i].height);
        } else {
            rb_list[i].draw();
        }
    }

    for (let i = 0; i < rb_list.length; i++) {
        for (let j = i + 1; j < rb_list.length; j++) {
            if (rb_list[i].collide(rb_list[j])) {
                rb_list[i].resolveCollision(rb_list[j]);
                console.log("HIT");
            }
        }
    }

    for (let i = 0; i < rb_list.length; i++) {
        rb_list[i].update()
    }

    rb_list[curr_body].vx += ax;
    rb_list[curr_body].vy += ay;
}