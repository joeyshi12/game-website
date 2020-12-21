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
        let j = Math.floor((this.x + this.width) / unitLength) + 1;
        if (j >= 0 && j < n) {
            for (let i = Math.floor(this.y / unitLength); i <= Math.floor((this.y + this.height) / unitLength); i++) {
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
            for (let j = Math.floor(this.x / unitLength); j <= Math.floor((this.x + this.width) / unitLength); j++) {
                if (solids.has(map[i * n + j])) {
                    return (i + 1) * unitLength;
                }
            }
        }
        return -1;
    }

    checkLeftWall(map) {
        let j = Math.floor(this.x / unitLength) - 1;
        if (j >= 0 && j < n) {
            for (let i = Math.floor(this.y / unitLength); i <= Math.floor((this.y + this.height) / unitLength); i++) {
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
            for (let j = Math.floor(this.x / unitLength); j <= Math.floor((this.x + this.width) / unitLength); j++) {
                if (solids.has(map[i * n + j]) || platforms.has(map[i * n + j])) {
                    return i * unitLength;
                }
            }
        }
        return -1;
    }
}
