class Camera {
    constructor(center_x, center_y, rightClamp) {
        this.center_x = center_x;
        this.center_y = center_y;
        this.rightClamp = rightClamp;
        this.x = center_x;
        this.y = center_y;
    }

    update(focus_x, focus_y) {
        if (focus_x < this.center_x) {
            this.x = 0;
        } else if (this.rightClamp < focus_x + this.center_x) {
            this.x = this.rightClamp - 2 * this.center_x;
        } else {
            this.x = focus_x - this.center_x;
        }
        this.y = Math.max(0, focus_y - this.center_y);
    }
}
