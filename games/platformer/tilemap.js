class Tilemap {
    constructor(cells, m, n) {
        this.cells = cells;
        this.m = m;
        this.n = n;
        this.spriteSheet = null;
    }

    update() {}

    draw() {
        for (var i = 0; i < this.m * this.n; i++) {
            const x = (i % this.n) * unitLength;
            const y = Math.floor(i / this.n) * unitLength;
            const sx = (this.cells[i] % 48) * 16;
            const sy = Math.floor(this.cells[i] / 48) * 16;
            image(spriteSheet, x - player.x + center_x, y - player.y + center_y, unitLength, unitLength, sx - 0.5, sy + 0.3, 16, 15.5);
        }
    }
}

const a = 21 + 6 * 48;
const b = 22 + 6 * 48;
const c = 23 + 6 * 48;
const d = 19 + 4 * 48;
const e = 18 + 4 * 48;
const I = 10 + 48 * 3;

const s = 21 + 5 * 48;

const h1 = 5 + 12 * 48;
const h2 = 6 + 12 * 48;
const h3 = 7 + 12 * 48;
const h4 = 5 + 13 * 48;
const h5 = 9 * 48;
const h6 = 7 + 13 * 48;

const solids = new Set();
solids.add(18);
solids.add(19);
solids.add(20);
solids.add(66);
solids.add(28);

const platforms = new Set();
platforms.add(a);
platforms.add(b);
platforms.add(c);

const cells = [ 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , h1, h2, h3, 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , h4, h5, h6, 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 18, 19, 19, 19, 19, 19, 19, 19, 19,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , s , 0 , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 18, 19, 19, 19, 20, 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 68, 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , a , b , c , 0 , 0 , 0 , 0 , I , a , b , c , 0 , 66, 0 , 0 , 0 , 68, 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 68, 22, 22, 22, 22, 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , a , b , c , I , 0 , 0 , 0 , 0 , a , b , c , I , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , e , 19, 19, 19, 19, d, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 50, 49, 0 , 0 , I , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , I , 0 , 0 , 0 , 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, d , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                48, I , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                19, 19, 19, 19, 19, d , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ];

const tilemap = new Tilemap(cells, 20, 40);