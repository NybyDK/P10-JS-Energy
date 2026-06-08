const arr = [
    [1, 2],
    [3, 4],
    [5, 6],
];

const arr2 = [1, 2, 3, 4, 5, 6];

arr.flat();

arr.reduce((a, b) => a.concat(b), []);

[].concat(...arr);

Math.max(...arr2);

Math.max.apply(null, arr2);

for (let i = 0; i < 1; i++) {
    JSON.parse("{}");
}

let i = 0;
while (i < 1) {
    JSON.parse("{}");
    i++;
}

for (const x of [0]) {
    JSON.parse("{}");
}

for (const x in { a: 1 }) {
    JSON.parse("{}");
}

num | 0;
~~num;
parseInt(num);

var x = 42;
var y = "Hello, World!";
