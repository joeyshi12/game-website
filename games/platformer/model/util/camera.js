const unitLength = 32;
const width = 700;
const height = 450;

class Camera {
    constructor(center_x, center_y, leftBound, rightBound, topBound, bottomBound) {
        this.center_x = center_x;
        this.center_y = center_y;
        this.leftBound = leftBound;
        this.rightBound = rightBound;
        this.topBound = topBound;
        this.bottomBound = bottomBound;
        this.x = center_x;
        this.y = center_y;
    }

    update(focus_x, focus_y) {
        this.x = Math.min(this.rightBound - 2 * this.center_x, Math.max(this.leftBound, focus_x - this.center_x));
        this.y = Math.min(this.bottomBound - 2 * this.center_y, Math.max(this.topBound, focus_y - this.center_y));
    }
}
