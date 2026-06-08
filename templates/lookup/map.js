const map = new Map();

for (let i = 0; i < 1024; i++) {
    map.set(i, i);
}

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += map.get(i % 1024);
}

const out = s;
