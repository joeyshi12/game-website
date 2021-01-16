const width = 600;
const height = 400;
const padding = 40;
const paddleWidth = 10;
const paddleHeight = 70;
const paddleSpeed = 6;
const ballDiameter = 12;
const ballSpeed = 10;
const maxBounceAngle = Math.PI / 3;
const buffer = 12;

class Paddle {
    constructor(x) {
        this.x = x;
        this.y = (height - paddleHeight) / 2;
        this.dir = 0;
    }

    setDirection(dir) {
        this.dir = dir;
    }

    update() {
        this.y = Math.min(height - paddleHeight, Math.max(0, this.y + paddleSpeed * this.dir));
    }

    draw() {
        rect(this.x, this.y, paddleWidth, paddleHeight);
    }
}

class Ball {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.tx = -1;
        this.ty = 0;
    }

    setDirection(tx, ty) {
        this.tx = tx;
        this.ty = ty;
    }

    update() {
        this.x += ballSpeed * this.tx;
        this.y += ballSpeed * this.ty;

        if (this.y <= 0) {
            this.ty = Math.abs(this.ty);
        } else if (this.y + ballDiameter >= height) {
            this.ty = -Math.abs(this.ty);
        }
    }

    draw() {
        circle(this.x, this.y, ballDiameter);
    }
}

class GameManager {
    constructor() {
        this.player = new Paddle(padding);
        this.opponent = new Paddle(width - padding - paddleWidth);
        this.ball = new Ball();
        this.tally = [0, 0];
        this.countDown = 0;
    }

    update() {
        this.handleGameOver();
        this.handleBallCollision();
        this.player.update();
        this.updateOpponent();
        this.ball.update();
    }

    keyPressListener() {
        if (keyCode === 87) {
            this.player.setDirection(-1);
        } else if (keyCode === 83) {
            this.player.setDirection(1);
        }
    }

    keyReleaseListener() {
        if (keyCode === 87 && this.player.dir === -1) {
            this.player.setDirection(0);
        } else if (keyCode === 83 && this.player.dir === 1) {
            this.player.setDirection(0);
        }
    }

    draw() {
        push();
        this.drawBackground();
        this.ball.draw();
        this.player.draw();
        this.opponent.draw();
        if (this.countDown > 0) {
            push();
            fill(255);
            textSize(32);
            text(this.countDown, width / 2 - 9, height / 2 - 20);
            pop();
        }
        pop();
    }

    drawBackground() {
        push();
        background(0);
        fill(255);
        line(width / 2, 0, width / 2, height);
        textSize(32);
        text(this.tally[0], 160, 40);
        text(this.tally[1], width - 180, 40);
        pop();
    }

    updateOpponent() {
        let dy = this.opponent.y - this.ball.y + paddleHeight / 2;
        if (dy > 5) {
            this.opponent.setDirection(-1);
        } else if (dy < 5) {
            this.opponent.setDirection(1);
        } else {
            this.opponent.setDirection(0);
        }
        this.opponent.update();
    }

    handleGameOver() {
        if (this.ball.x >= 0 && this.ball.x + ballDiameter <= width) {
            return;
        }
        if (this.ball.x < 0) {
            this.ball.setDirection(1, 0);
            this.tally[1] += 1;
        } else {
            this.ball.setDirection(-1, 0);
            this.tally[0] += 1;
        }
        const next_dx = this.ball.tx;
        this.ball.tx = 0;
        this.ball.ty = 0;
        this.ball.x = width / 2;
        this.ball.y = height / 2;
        this.countDown = 3;
        setTimeout(() => {
            this.countDown--;
            setTimeout(() => {
                this.countDown--;
                setTimeout(() => {
                    this.countDown--;
                    this.ball.tx = next_dx;
                }, 600)
            }, 600);
        }, 600)
    }

    handleBallCollision() {
        if (this.ball.tx < 0) {
            if (this.player.x <= this.ball.x && this.ball.x <= this.player.x + paddleWidth + buffer) {
                if (this.player.y < this.ball.y && this.ball.y < this.player.y + paddleHeight) {
                    const t = 2 * (this.ball.y - this.player.y - paddleHeight / 2) / paddleHeight;
                    const angle = Math.atan(t * maxBounceAngle);
                    this.ball.setDirection(Math.cos(angle), Math.sin(angle))
                    if (this.bounceSound) {
                        this.bounceSound.play();
                    }
                }
            }
        } else if (this.ball.tx > 0) {
            if (this.opponent.x - buffer <= this.ball.x && this.ball.x <= this.opponent.x + paddleWidth) {
                if (this.opponent.y < this.ball.y && this.ball.y < this.opponent.y + paddleHeight) {
                    const t = 2 * (this.ball.y - this.opponent.y - paddleHeight / 2) / paddleHeight;
                    const angle = Math.atan(t * maxBounceAngle);
                    this.ball.setDirection(-Math.cos(angle), Math.sin(angle))
                    if (this.bounceSound) {
                        this.bounceSound.play();
                    }
                }
            }
        }
    }
}

let canvas;
const gameManager = new GameManager();

function preload() {
    gameManager.bounceSound = loadSound('games/pong/bounce_sound.wav');
}

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent("sketch-holder");
    canvas.center('vertical');
    canvas.center('horizontal');
}

function windowResized() {
    canvas.center('vertical');
    canvas.center('horizontal');
}

function keyPressed() {
    gameManager.keyPressListener();
}

function keyReleased() {
    gameManager.keyReleaseListener();
}

function draw() {
    gameManager.draw();
    gameManager.update();
}