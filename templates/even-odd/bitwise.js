let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    if ((i & 1) === 0) s++;
}

const out = s;
