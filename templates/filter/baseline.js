const arr = new Array(1024).fill(0).map((_, i) => i);

let newArr = [];

for (let i = 0; i < __ITERATIONS__; i++) {
    newArr = [];
    newArr = arr.filter(x => (x & 1) === 0);
}

const out = newArr;
