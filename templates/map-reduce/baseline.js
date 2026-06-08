const arr = new Array(1024).fill(0).map((_, i) => i);

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += arr.map(x => x * 2).reduce((acc, x) => acc + x, 0);
}

const out = s;
