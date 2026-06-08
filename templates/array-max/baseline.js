const arr = Array.from({ length: 1024 }, () => Math.random() * 1024);

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += Math.max(...arr);
}

const out = s;
