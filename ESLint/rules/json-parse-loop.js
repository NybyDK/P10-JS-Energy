export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Avoid JSON.parse() inside loops.",
        },
    },

    create(context) {
        function isJSONParse(node) {
            return (
                node.type === "CallExpression" &&
                node.callee.type === "MemberExpression" &&
                node.callee.object.name === "JSON" &&
                node.callee.property.name === "parse"
            );
        }

        function checkLoop(node) {
            function traverse(n) {
                if (!n) return false;
                if (isJSONParse(n)) return true;

                for (const key in n) {
                    const value = n[key];
                    if (value && typeof value === "object") {
                        if (traverse(value)) return true;
                    }
                }

                return false;
            }

            if (traverse(node.body)) {
                context.report({
                    node,
                    message: "Avoid JSON.parse() inside loops.",
                });
            }
        }

        return {
            // Multiple types of loops, but is this okay when I only benchmarked it for ForStatement? Debatable
            ForStatement: checkLoop,
            WhileStatement: checkLoop,
            ForOfStatement: checkLoop,
            ForInStatement: checkLoop,
        };
    },
};
