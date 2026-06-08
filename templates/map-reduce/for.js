const arr = new Array(1024).fill(0).map((_, i) => i);

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    let l = 0;
    for (let j = 0; j < arr.length; j++) {
        l += arr[j] * 2;
    }
    s += l;
}

const out = s;
