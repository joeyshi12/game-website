class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collide(entity) {
        if (this.x + this.width < entity.x || this.x > entity.x + entity.width) {
            return false;
        }
        return !(this.y + this.height < entity.y || this.y > entity.y + entity.height);
    }

    update() {
        throw new Error("Abstract method");
    }

    draw() {
        throw new Error("Abstract method");
    }

    checkRightWall(map) {
        let j = Math.floor((this.x + this.width/2) / unitLength) + 1;
        if (j >= map.numCols && !map.rightMap) {
            return map.numCols * unitLength;
        }
        if (j >= 0 && j < map.numCols) {
            let start = Math.floor(this.y / unitLength);
            let end = Math.floor((this.y + this.height) / unitLength);
            start = Math.min(map.numRows, Math.max(0, start));
            end = Math.min(map.numRows, Math.max(0, end));
            for (let i = start; i <= end; i++) {
                if (solids.has(map.getTile(i, j))) {
                    return j * unitLength;
                }
            }
        }
        return -1;
    }

    checkCeiling(map) {
        let i = Math.floor((this.y + this.height) / unitLength) - 1;
        if (i >= 0 && i < map.numRows) {
            let start = Math.floor(this.x / unitLength);
            let end = Math.floor((this.x + this.width) / unitLength);
            start = Math.min(map.numCols, Math.max(0, start));
            end = Math.min(map.numCols, Math.max(0, end));
            for (let j = start; j <= end; j++) {
                if (solids.has(map.getTile(i, j))) {
                    return (i + 1) * unitLength;
                }
            }
        }
        return -1;
    }

    checkLeftWall(map) {
        let j = Math.floor((this.x + this.width/2) / unitLength) - 1;
        if (j < 0 && !map.leftMap) {
            return -unitLength;
        }
        if (j >= 0 && j < map.numCols) {
            let start = Math.floor(this.y / unitLength);
            let end = Math.floor((this.y + this.height) / unitLength);
            start = Math.min(map.numRows, Math.max(0, start));
            end = Math.min(map.numRows, Math.max(0, end));
            for (let i = start; i <= end; i++) {
                if (solids.has(map.getTile(i, j))) {
                    return j * unitLength;
                }
            }
        }
        return -1;
    }

    checkGround(map) {
        let i = Math.floor((this.y + this.height) / unitLength) + 1;
        if (i >= 0 && i < map.numRows) {
            let start = Math.floor(this.x / unitLength);
            let end = Math.floor((this.x + this.width) / unitLength);
            start = Math.min(map.numCols, Math.max(0, start));
            end = Math.min(map.numCols, Math.max(0, end));
            for (let j = start; j <= end; j++) {
                if (solids.has(map.getTile(i, j)) || platforms.has(map.getTile(i, j))) {
                    return i * unitLength;
                }
            }
        }
        return -1;
    }
}
