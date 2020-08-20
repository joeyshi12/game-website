class Tilemap {
    constructor(cells, m, n) {
        this.cells = cells;
        this.m = m;
        this.n = n;
        this.spriteSheet = null;
    }

    draw() {
        for (var i = 0; i < this.m * this.n; i++) {
            const x = (i % this.n) * unitLength;
            const y = Math.floor(i / this.n) * unitLength;
            const sx = (this.cells[i] % 48) * 16;
            const sy = Math.floor(this.cells[i] / 48) * 16;
            image(spriteSheet, x, y, unitLength, unitLength, sx, sy, 16, 16);
        }
    }
}

const a = 21 + 6 * 48;
const b = 22 + 6 * 48;
const c = 23 + 6 * 48;

const d = 19 + 4 * 48;
const e = 18 + 48;
const f = 10 + 48 * 3;


const solidTiles = new Set();
solidTiles.add(18);
solidTiles.add(19);
solidTiles.add(a);
solidTiles.add(b);
solidTiles.add(c);

const cells = [ 0 , f , 0 , 0 , 0 , 0 , f , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , f , 0 , 0 , 0 , 0 , f , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , f , 0 , 0 , 0 , 0 , f , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , f , 0 , 0 , 0 , 0 , f , 0 , 0 , 0 , a , b , c , 0 , 0 ,
                0 , f , 0 , 0 , 0 , 0 , f , a , b , c , 0 , 0 , 0 , 50, 49,
                0 , f , 0 , 0 , 0 , 18, 19, 19, 19, 19, 19, 19, 19, 19, 19,
                48, f , a , b , c , e , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 ,
                19, 19, 19, 19, 19, d , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ];

const tilemap = new Tilemap(cells, 9, 15);