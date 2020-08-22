class RigidBody {
    constructor(x, y, width, height, mass=1, restitution=1) {
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

        if (this.x + this.width < rb.x) {
            console.log(0);
            nx = 1;
            ny = 0;
        } else if (this.x > rb.x + rb.width) {
            console.log(1);
            nx = -1;
            ny = 0;
        } else if (this.y + this.height < rb.y) {
            console.log(2);
            nx = 0;
            ny = -1;
        } else if (this.y > rb.y + rb.height) {
            console.log(3);
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

        console.log(this.vx);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        rect(this.x, this.y, this.width, this.height);
    }
}