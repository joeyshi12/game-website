class Rectangle {
    constructor(x1, y1, x2, y2, restitution=1) {
        self.x1 = x1;
        self.y1 = y1;
        self.x2 = x2;
        self.y2 = y2;
        self.restitution = restitution;
    }

    collideRect(rect) {
        if (this.x2 < rect.x1 || this.x1 > rect.x2) {
            return false;
        }

        return !(this.y2 < rect.y1 || this.y1 > rect.y2);
    }

    collideCircle(circ) {

    }

    resolveCollisionRect(rect) {
        const rvx = B.vx - A.vx;
        const rvy = B.vy - A.vy;

        // Compute normal
        const nx = 0;
        const ny = 0;

        const velAlongNormal = rvx * nx + rvy * ny;

        if (velAlongNormal > 0) {
            return;
        }

        const e = Math.min(A.restitution, B.restitution);

        let j = -(1 + e) * velAlongNormal;
        j /= 1 / A.m + 1 / B.m;

        const impulse_x = j * nx;
        const impulse_y = j * ny;

        A.vx -= impulse_x / A.m; A.vy -= impulse_y / A.m;
        B.vx += impulse_x / B.m; B.vy += impulse_y / B.m;
    }
}

class Circle {
    constructor(x, y, r, restitution=1) {
        self.x = x;
        self.y = y;
        self.r = r;
        self.restitution = restitution;
    }

    collideCircle(circ) {
        return (this.x - circ.x) ** 2 + (this.y - circ.y) ** 2 < (this.r + circ.r) ** 2;
    }
}