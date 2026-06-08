const m = "strongPassword123!";

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    // https://ihateregex.io/expr/password/
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g.test(m)) s += i;
}

const out = s;
