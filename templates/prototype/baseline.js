Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    s += i.mod(26);
}

const out = s;
