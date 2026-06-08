const users = new Array(1024).fill(0).map((_, i) => i);
const orders = new Array(1024).fill(0).map((_, i) => i);

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    const u = users[i % 1024];

    let found = undefined;

    for (let j = 0; j < 1024; j++) {
        if (orders[j] === u) {
            found = orders[j];
            break;
        }
    }

    if (found !== undefined) s += found;
}

const out = s;
