export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Prefer [].concat(...arr) for flattening arrays",
        },
        fixable: "code",
    },

    create(context) {
        return {
            CallExpression(node) {
                // arr.flat()
                if (node.callee.type === "MemberExpression" && node.callee.property.name === "flat") {
                    context.report({
                        node,
                        message: "Use [].concat(...arr) instead of flat() for up to 1.46x better performance",
                        fix(fixer) {
                            const sourceCode = context.sourceCode;
                            const obj = sourceCode.getText(node.callee.object);

                            return fixer.replaceText(node, `[].concat(...${obj})`);
                        },
                    });
                }

                // arr.reduce(concat)
                if (node.callee.type === "MemberExpression" && node.callee.property.name === "reduce") {
                    const [callback] = node.arguments;

                    if (callback && callback.type === "ArrowFunctionExpression") {
                        const body = callback.body;

                        if (
                            body.type === "CallExpression" &&
                            body.callee.type === "MemberExpression" &&
                            body.callee.property.name === "concat"
                        ) {
                            context.report({
                                node,
                                message:
                                    "Use [].concat(...arr) instead of reduce+concat for up to 13x better performance",
                                fix(fixer) {
                                    const sourceCode = context.sourceCode;
                                    const obj = sourceCode.getText(node.callee.object);

                                    return fixer.replaceText(node, `[].concat(...${obj})`);
                                },
                            });
                        }
                    }
                }
            },
        };
    },
};
