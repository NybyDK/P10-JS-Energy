const arr = new Array(1024).fill(1);

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += arr.reduce((acc, x) => acc + x, 0);
}

const out = s;
