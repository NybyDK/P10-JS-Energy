const arr = new Array(1024).fill(undefined).map((_, i) => (i % 2 === 0 ? i : { v: i }));

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    const e = arr[i % arr.length];

    if (typeof e === "number") {
        s += e;
    } else {
        s += e.v;
    }
}

const out = s;
