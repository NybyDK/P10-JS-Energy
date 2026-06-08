const str = "abcdefghijklmnopqrstuvwxyz";

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    if (str.substr(0, 2) !== "xx") s++;
}

const out = s;
