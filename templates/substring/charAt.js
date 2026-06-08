const str = "abcdefghijklmnopqrstuvwxyz";

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    if (str.charAt(0) !== "x" && str.charAt(1) !== "x") s++;
}

const out = s;
