const n = 21;
const unitLength = 25;

class Snake {
    constructor() {
        this.direction = "R";
        this.xpos = [5, 4, 3];
        this.ypos = [10, 10, 10];
        this.size = 3;
    }

    grow() {
        this.xpos.push(2 * this.xpos[this.size - 1] - this.xpos[this.size - 2]);
        this.ypos.push(2 * this.ypos[this.size - 1] - this.ypos[this.size - 2]);
        this.size++;
    }

    checkCollide() {
        for (var i = 1; i < this.size; i++) {
            if (this.xpos[0] === this.xpos[i] && this.ypos[0] === this.ypos[i]) {
                return true;
            }
        }

        return this.xpos[0] === 0 || this.xpos[0] === n - 1 || this.ypos[0] === 0 || this.ypos[0] === n - 1;
    }

    update() {
        if (this.direction === "U") {
            this.xpos.unshift(this.xpos[0]);
            this.ypos.unshift(this.ypos[0] - 1);
        } else if (this.direction === "D") {
            this.xpos.unshift(this.xpos[0]);
            this.ypos.unshift(this.ypos[0] + 1);
        } else if (this.direction === "L") {
            this.xpos.unshift(this.xpos[0] - 1);
            this.ypos.unshift(this.ypos[0]);
        } else {
            this.xpos.unshift(this.xpos[0] + 1);
            this.ypos.unshift(this.ypos[0]);
        }

        this.xpos.pop();
        this.ypos.pop();
    }

    draw() {
        fill(0, 255, 0);
        for (var i = 0; i < this.size; i++) {
            square(this.xpos[i] * unitLength, this.ypos[i] * unitLength, unitLength);
        }
    }
}

class Food {
    constructor() {
        this.x = 14;
        this.y = 10;
        this.img = null;
    }

    setImage(img) {
        this.img = img;
    }

    draw() {
        if (this.img) {
            image(this.img, this.x * unitLength, this.y * unitLength, unitLength, unitLength)
        }
    }
}

class GameRun {
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.isGameOver = false;
    }

    update() {
        if (!this.isGameOver) {
            this.snake.update();

            if (this.snake.xpos[0] === this.food.x && this.snake.ypos[0] === this.food.y) {
                this.snake.grow();
                this.food.x = Math.floor(Math.random() * (n - 2) + 1);
                this.food.y = Math.floor(Math.random() * (n - 2) + 1);

                while (true) {
                    let appleMisplaced = false;

                    for (var i = 0; i < this.snake.size; i++) {
                        if (this.snake.xpos[0] === this.food.x && this.snake.ypos[0] === this.food.y) {
                            appleMisplaced = true;
                            break
                        }
                    }

                    if (!appleMisplaced) {
                        break;
                    }

                    this.food.x = Math.floor(Math.random() * (n - 2) + 1);
                    this.food.y = Math.floor(Math.random() * (n - 2) + 1);
                }
            }

            if (this.snake.checkCollide()) {
                this.isGameOver = true;
            }
        }
    }

    keyPressed() {
        const dx = this.snake.xpos[0] - this.snake.xpos[1];
        const dy = this.snake.ypos[0] - this.snake.ypos[1];

        if ((keyCode === 87 || keyCode === 38) && dy <= 0) {
            this.snake.direction = "U";
        }

        if ((keyCode === 83 || keyCode === 40) && dy >= 0) {
            this.snake.direction = "D";
        }

        if ((keyCode === 65 || keyCode === 37) && dx <= 0) {
            this.snake.direction = "L";
        }

        if ((keyCode === 68 || keyCode === 39) && dx >= 0) {
            this.snake.direction = "R";
        }
    }

    draw() {
        this.food.draw();
        this.snake.draw();

        fill(0);
        for (var i = 0; i < width / unitLength - 1; i++) {
            square(i * unitLength, 0, unitLength);
            square((n - 1) * unitLength, i * unitLength, unitLength);
            square((i + 1) * unitLength, (n - 1) * unitLength, unitLength);
            square(0, (i + 1) * unitLength, unitLength);
        }

        if (this.isGameOver) {
            fill(0);
            textSize(30);
            text('yuo died', 64, 80);
            text('score: ' + (this.snake.size - 3), 64, 120);
        }
    }
}

let gameRun = new GameRun();

function preload() {
    gameRun.food.setImage(loadImage("games/snake/apple.png"));
}

function setup() {
    var canvas = createCanvas(n * unitLength, n * unitLength);
    canvas.parent("sketch-holder");
}

function keyPressed() {
    gameRun.keyPressed(keyCode);
}

function draw() {
    background(255);
    fill(255, 255, 255);
    frameRate(12);
    gameRun.draw();
    gameRun.update();
}