function mod(n, m) {
    return ((n % m) + m) % m;
}

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += mod(i, 26);
}

const out = s;
