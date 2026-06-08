const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { d: 4, e: 5, f: 6 };

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    const merged = { ...obj1, ...obj2 };
    s += merged.a;
    s += merged.b;
    s += merged.c;
    s += merged.d;
    s += merged.e;
    s += merged.f;
}

const out = s;
