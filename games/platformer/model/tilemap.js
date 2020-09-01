class Tilemap {
    constructor(cells, m, n) {
        this.cells = cells;
        this.m = m;
        this.n = n;
        this.spriteSheet = null;
    }

    draw(shift_x = 0, shift_y = 0) {
        for (let i = 0; i < this.m * this.n; i++) {
            const x = (i % this.n) * unitLength;
            const y = Math.floor(i / this.n) * unitLength;
            const sx = (this.cells[i] % 48) * 16;
            const sy = Math.floor(this.cells[i] / 48) * 16;
            image(spriteSheet, x - shift_x, y - shift_y, unitLength, unitLength, sx, sy, 15.5, 16);
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
const f1 = 17 + 9 * 48;
const f2 = 17 + 8 * 48;
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
solids.add(68)
solids.add(e);
solids.add(d);

const platforms = new Set();
platforms.add(a);
platforms.add(b);
platforms.add(c);

const m = 20;
const n = 40;
const cells1 = [
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , h1, h2, h3, 0 , I , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , h4, h5, h6, 0 , I , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 18, 19, 19, 19, 19, 19, 19, 19, 19,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , a , b , c , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 18, 19, 19, 19, 20, 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 68, 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , a , b , c , 0 , 0 , 0 , 0 , I , a , b , c , 0 , 66, 0 , 0 , 0 , 68, 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 68, 22, 22, 22, 22, 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , a , b , c , I , 0 , 0 , 0 , 0 , a , b , c , I , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , e , 19, 19, 19, 19, d , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 50, 50, 49, 0 , 0 , I , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, d , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , f1, 0 , 48, 66, 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    19, 19, 19, 19, 19, d , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0
];

const cells2 = [
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , f2, 0 , 0 ,
    0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 18, 19, 19, 19, 19, 19,
    19, 19, 19, 19, 20, 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 66, 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 68, 0 , a , b , c , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , a , b , c , 0 , 0 , 0 , 0 , 0 , 0 , 18, 19, 19, d , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 68, 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 68, 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 68, 0 , 0 , 0 , 0 , I , a , b , c , 0 , 0 , 0 , 0 , I , a , b , c , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 68, 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 68, 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 68, 0 , a , b , c , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 22, 22, 22, 22, 22, 22, 22, 22, 22, 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 68, 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 0 , 0 , 0 , I , 0 , 0 , 0 , 0 , 18, 19, 19, 19, 19, 19, 19, 19, 19, d , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 68, 50, 49, 49, 0 , I , 49, 50, 0 , 0 , 0 , 50, 50, I , 0 , 0 , 49, 50, 66, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , e , 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, d , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 67, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
    0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0
];