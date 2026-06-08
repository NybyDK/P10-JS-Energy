const users = new Array(1024).fill(0).map((_, i) => i);
const orders = new Array(1024).fill(0).map((_, i) => i);

const orderMap = new Map();

for (let i = 0; i < 1024; i++) {
    orderMap.set(orders[i], orders[i]);
}

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    const u = users[i % 1024];
    const v = orderMap.get(u);
    if (v !== undefined) s += v;
}

const out = s;
