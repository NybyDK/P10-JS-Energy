const str = "The quick brown fox jumps over the lazy dog";

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    if (str.includes("dog")) s++;
}

const out = s;
