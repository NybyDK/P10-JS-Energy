const obj = {};

for (let i = 0; i < 1024; i++) {
    obj["key" + i] = i;
}

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += obj["key" + (i % 1024)];
}

const out = s;
