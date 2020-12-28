class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collide(gameObject) {
        if (this.x + this.width < gameObject.x || this.x > gameObject.x + gameObject.width) {
            return false;
        }
        return !(this.y + this.height < gameObject.y || this.y > gameObject.y + gameObject.height);
    }

    checkRightWall(map) {
        let j = Math.floor((this.x + this.width/2) / unitLength) + 1;
        if (j >= 0 && j < n) {
            let start = Math.floor(this.y / unitLength);
            let end = Math.floor((this.y + this.height) / unitLength);
            start = Math.min(m, Math.max(0, start));
            end = Math.min(m, Math.max(0, end));
            for (let i = start; i <= end; i++) {
                if (solids.has(map[i * n + j])) {
                    return j * unitLength;
                }
            }
        }
        return -1;
    }

    checkCeiling(map) {
        let i = Math.floor((this.y + this.height) / unitLength) - 1;
        if (i >= 0 && i < m) {
            let start = Math.floor(this.x / unitLength);
            let end = Math.floor((this.x + this.width) / unitLength);
            start = Math.min(n, Math.max(0, start));
            end = Math.min(n, Math.max(0, end));
            for (let j = start; j <= end; j++) {
                if (solids.has(map[i * n + j])) {
                    return (i + 1) * unitLength;
                }
            }
        }
        return -1;
    }

    checkLeftWall(map) {
        let j = Math.floor((this.x + this.width/2) / unitLength) - 1;
        if (j >= 0 && j < n) {
            let start = Math.floor(this.y / unitLength);
            let end = Math.floor((this.y + this.height) / unitLength);
            start = Math.min(m, Math.max(0, start));
            end = Math.min(m, Math.max(0, end));
            for (let i = start; i <= end; i++) {
                if (solids.has(map[i * n + j])) {
                    return j * unitLength;
                }
            }
        }
        return -1;
    }

    checkGround(map) {
        let i = Math.floor((this.y + this.height) / unitLength) + 1;
        if (i >= 0 && i < m) {
            let start = Math.floor(this.x / unitLength);
            let end = Math.floor((this.x + this.width) / unitLength);
            start = Math.min(n, Math.max(0, start));
            end = Math.min(n, Math.max(0, end));
            for (let j = start; j <= end; j++) {
                if (solids.has(map[i * n + j]) || platforms.has(map[i * n + j])) {
                    return i * unitLength;
                }
            }
        }
        return -1;
    }
}
