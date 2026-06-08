const arr = new Array(1024).fill(0).map((_, i) => i);

let newArr = [];

for (let i = 0; i < __ITERATIONS__; i++) {
    newArr = [];
    for (let j = 0; j < arr.length; j++) {
        if ((arr[j] & 1) === 0) newArr.push(arr[j]);
    }
}

const out = newArr;
