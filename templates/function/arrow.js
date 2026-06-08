const add1 = x => x + 1;

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += add1(i);
}

const out = s;
