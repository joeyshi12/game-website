class RigidBody {
    constructor(x, y, width, height, mass = 1, restitution = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.mass = mass;
        this.restitution = restitution;
        this.vx = 0;
        this.vy = 0;
    }

    collide(rb) {
        if (this.x + this.width < rb.x || this.x > rb.x + rb.width) {
            return false;
        }
        return !(this.y + this.height < rb.y || this.y > rb.y + rb.height);
    }

    resolveCollision(rb) {
        const rvx = rb.vx - this.vx;
        const rvy = rb.vy - this.vy;
        let nx, ny;

        const dx = rb.x + rb.width / 2 - (this.x + this.width / 2);
        const dy = rb.y + rb.height / 2 - (this.y + this.height / 2);
        if (dx > 0 && Math.abs(dy) < this.height && rvx < 0) {
            nx = 1;
            ny = 0;
        } else if (dx < 0 && Math.abs(dy) < this.height && rvx > 0) {
            nx = -1;
            ny = 0;
        } else if (dy < 0 && Math.abs(dx) < this.width && rvy > 0) {
            nx = 0;
            ny = -1;
        } else if (dy > 0 && Math.abs(dx) < this.width && rvy < 0) {
            nx = 0;
            ny = 1;
        } else {
            return;
        }

        const velAlongNormal = rvx * nx + rvy * ny;

        if (velAlongNormal > 0) {
            return;
        }

        const e = Math.min(this.restitution, rb.restitution);

        let j = -(1 + e) * velAlongNormal;
        j /= 1 / this.mass + 1 / rb.mass;

        const impulse_x = j * nx;
        const impulse_y = j * ny;

        this.vx -= impulse_x / this.mass;
        this.vy -= impulse_y / this.mass;
        rb.vx += impulse_x / rb.mass;
        rb.vy += impulse_y / rb.mass;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        noFill();
        stroke(100, 255, 100);
        rect(this.x - player.x + camera.x, this.y - player.y + camera.y, this.width, this.height);
    }
}