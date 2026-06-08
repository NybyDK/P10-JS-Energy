const arr = new Array(1024).fill("x");

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += arr.join("").length;
}

const out = s;
