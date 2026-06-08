export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Prefer loop-based max instead of Math.max()",
        },
    },

    create(context) {
        return {
            CallExpression(node) {
                // Math.max(...arr)
                const isMathMax =
                    node.callee.type === "MemberExpression" &&
                    node.callee.object.name === "Math" &&
                    node.callee.property.name === "max";

                const hasSpread = node.arguments && node.arguments.some(arg => arg.type === "SpreadElement");

                if (isMathMax && hasSpread) {
                    context.report({
                        node,
                        message: "Avoid Math.max(...arr), use loop-based max.",
                    });
                }

                // Math.max.apply(null, arr)
                if (
                    node.callee.type === "MemberExpression" &&
                    node.callee.object.type === "MemberExpression" &&
                    node.callee.object.object.name === "Math" &&
                    node.callee.object.property.name === "max" &&
                    node.callee.property.name === "apply"
                ) {
                    const args = node.arguments;

                    if (args.length === 2 && args[0]?.type === "Literal" && args[1]) {
                        context.report({
                            node,
                            message: "Avoid Math.max.apply(null, arr), use loop-based max.",
                        });
                    }
                }
            },
        };
    },
};
