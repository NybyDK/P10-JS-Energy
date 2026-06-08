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

const keys = Object.keys(obj);
for (let i = 0; i < __ITERATIONS__; i++) {
    for (let j = 0; j < keys.length; j++) {
        const k = keys[j];
        s += obj[k];
    }
}

const out = s;
