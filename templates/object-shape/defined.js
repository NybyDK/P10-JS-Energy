let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    const obj = { a: 1, b: 2, c: 3 };

    s += obj.a;
    s += obj.b;
    s += obj.c;
}

const out = s;
