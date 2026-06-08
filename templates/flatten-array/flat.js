const arr = Array.from({ length: 1024 }, (_, i) => [i, i + 1]);

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += arr.flat().length;
}

const out = s;
