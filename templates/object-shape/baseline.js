let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    const obj = {};

    obj.a = 1;
    obj.b = 2;
    obj.c = 3;

    s += obj.a;
    s += obj.b;
    s += obj.c;
}

const out = s;
