class Camera {
    constructor(center_x, center_y) {
        this.center_x = center_x;
        this.center_y = center_y;
        this.x = center_x;
        this.y = center_y;
    }

    update(focus_x, focus_y) {
        if (focus_x < this.center_x) {
            this.x = focus_x;
        } else if (focus_x - n * (unitLength - 15) > this.center_x) {
            this.x = focus_x - n * (unitLength - 15);
        } else {
            this.x = this.center_x;
        }

        this.y = Math.min(focus_y, this.center_y);
    }
}
