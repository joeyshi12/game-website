class Camera {
    constructor(center_x, center_y) {
        this.center_x = center_x;
        this.center_y = center_y;
        this.x = center_x;
        this.y = center_y;
    }

    update() {
        if (player.x < this.center_x) {
            this.x = player.x
        } else if (player.x - tilemap.n * (unitLength - 15) > this.center_x) {
            this.x = player.x - tilemap.n * (unitLength - 15);
        } else {
            this.x = this.center_x;
        }

        this.y = Math.min(player.y, this.center_y);
    }
}
