class FireBall {
    SPEED =  10;

    constructor(x, y, dir_x, dir_y) {
        this.x = x;
        this.y = y;
        this.dir_x = dir_x;
        this.dir_y = dir_y;
        this.rotation = 1;
    }

    update() {
        this.x += this.SPEED * this.dir_x;
        this.y += this.SPEED * this.dir_y;
    }

    draw() {
        push();
        fill(255);
        circle(this.x - camera.x, this.y - camera.y, 30);
        pop();
    }
}