const arr = new Array(1024).fill("x");

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    let str = "";

    for (let j = 0; j < arr.length; j++) {
        str = `${str}${arr[j]}`;
    }

    s += str.length;
}

const out = s;
