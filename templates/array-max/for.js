const arr = Array.from({ length: 1024 }, () => Math.random() * 1024);

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    let max = -Infinity;

    for (let j = 0; j < arr.length; j++) {
        if (arr[j] > max) {
            max = arr[j];
        }
    }

    s += max;
}

const out = s;
