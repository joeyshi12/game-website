let rb1 = new RigidBody(100, 100, 100, 100);
let rb2 = new RigidBody(300, 100, 100, 100, mass = 100);
let rb3 = new RigidBody(-100, 100, 100, 100, mass = Infinity);

rb2.vx = -5;

function setup() {
    const canvas = createCanvas(700, 500);
    canvas.parent("sketch-holder");
    hierarchy = [tilemap, player];
}

function keyPressed() {
    if (keyCode === 87) {
        rb1.vy += -1;
    } else if (keyCode === 83) {
        rb1.vy += 1;
    } else if (keyCode === 68) {
        rb1.vx += 1;
    } else if (keyCode === 65) {
        rb1.vx += -1;
    }
}

function draw() {
    background(0);
    rb1.draw();
    rb2.draw();

    rb1.update();
    rb2.update();
    rb3.update();

    if (rb1.collide(rb2)) {
        rb1.resolveCollision(rb2);
    }

    if (rb1.collide(rb3)) {
        rb1.resolveCollision(rb3);
    }
}