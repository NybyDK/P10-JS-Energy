const str = "abcdefghijklmnopqrstuvwxyz";

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    if (str.charAt(i % str.length) === "x") s++;
}

const out = s;
