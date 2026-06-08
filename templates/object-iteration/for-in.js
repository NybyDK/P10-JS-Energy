const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
};

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    for (const k in obj) {
        s += obj[k];
    }
}

const out = s;
