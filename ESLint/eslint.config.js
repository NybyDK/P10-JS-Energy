import jsonParseLoop from "./rules/json-parse-loop.js";
import flattenArray from "./rules/flatten-array.js";
import arrayMax from "./rules/array-max.js";
import mathFloor from "./rules/math-floor.js";
import exampleRule from "./rules/example.js";

export default [
    {
        plugins: {
            "energy-rules": {
                rules: {
                    "json-parse-loop": jsonParseLoop,
                    "flatten-array": flattenArray,
                    "array-max": arrayMax,
                    "math-floor": mathFloor,
                    example: exampleRule,
                },
            },
        },
        rules: {
            "energy-rules/json-parse-loop": "warn",
            "energy-rules/flatten-array": "warn",
            "energy-rules/array-max": "warn",
            "energy-rules/math-floor": "warn",
            "energy-rules/example": "warn",
        },
    },
];
