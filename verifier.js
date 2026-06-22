const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.join(__dirname, "templates");

function run(file) {
    const src = fs.readFileSync(file, "utf8").replaceAll("__ITERATIONS__", 10);

    const wrapper = `
    let __RESULT__;
    (function () {
      ${src}
      __RESULT__ = out;
    })();
    __RESULT__;
    `;

    return new vm.Script(wrapper, { filename: file }).runInContext(vm.createContext({}));
}

for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
    test(entry.name, () => {
        const dir = path.join(ROOT, entry.name);
        const baselineFile = path.join(dir, "baseline.js");

        const expected = run(baselineFile);

        for (const file of fs.readdirSync(dir)) {
            if (file === "baseline.js") continue;

            const actual = run(path.join(dir, file));

            assert.deepStrictEqual(
                JSON.parse(JSON.stringify(actual)),
                JSON.parse(JSON.stringify(expected)),
                `Benchmark "${entry.name}": ${file} output differs from expected baseline.js`,
            );
        }
    });
}
