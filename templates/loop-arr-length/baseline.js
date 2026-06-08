const arr = new Array(1024).fill(1);

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    for (let j = 0; j < arr.length; j++) {
        s += arr[j];
    }
}

const out = s;
