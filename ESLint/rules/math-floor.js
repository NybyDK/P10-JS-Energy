export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Prefer Math.floor().",
        },
    },

    create(context) {
        return {
            // num | 0
            BinaryExpression(node) {
                if (node.operator === "|") {
                    const isZero = node.right.type === "Literal" && node.right.value === 0;

                    if (isZero) {
                        context.report({
                            node,
                            message: "Avoid num | 0. Use Math.floor(num).",
                        });
                    }
                }
            },

            // ~~num
            UnaryExpression(node) {
                if (node.operator === "~") {
                    if (node.argument.type === "UnaryExpression" && node.argument.operator === "~") {
                        context.report({
                            node,
                            message: "Avoid ~~num. Use Math.floor(num).",
                        });
                    }
                }
            },

            // parseInt(num)
            CallExpression(node) {
                if (node.callee.type === "Identifier" && node.callee.name === "parseInt") {
                    context.report({
                        node,
                        message: "Avoid parseInt(num). Use Math.floor(num).",
                    });
                }
            },
        };
    },
};
