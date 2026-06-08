const arr = new Array(1024).fill(1);

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    arr.forEach(x => {
        s += x;
    });
}

const out = s;
