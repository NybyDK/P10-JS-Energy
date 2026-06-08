const arrNum = new Array(512).fill(undefined).map((_, i) => i * 2);
const arrObj = new Array(512).fill(undefined).map((_, i) => ({ v: i * 2 + 1 }));

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    if (i % 2 === 0) {
        s += arrNum[i % arrNum.length];
    } else {
        s += arrObj[i % arrObj.length].v;
    }
}

const out = s;
