const m = "strongPassword123";

let s = 0;

for (let i = 0; i < __ITERATIONS__; i++) {
    // https://ihateregex.io/expr/password/
    const r = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
    if (r.test(m)) s += i;
}

const out = s;
