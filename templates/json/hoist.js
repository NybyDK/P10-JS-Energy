const jsonString = JSON.stringify({
    a: 1,
    b: 2,
    c: 3,
    d: 4,
});
const keys = ["a", "b", "c", "d"];

let s = 0;

const config = JSON.parse(jsonString);
for (let i = 0; i < __ITERATIONS__; i++) {
    const key = keys[i % keys.length];
    s += config[key];
}

const out = s;
