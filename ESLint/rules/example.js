export default {
    meta: {
        type: "suggestion",
        docs: {
            description: "Prefer let over var",
        },
        fixable: "code",
    },
    create(context) {
        return {
            VariableDeclaration(node) {
                if (node.kind === "var") {
                    context.report({
                        node,
                        message: "Use let instead of var",
                        fix: fixer => fixer.replaceText(node, "let"),
                    });
                }
            },
        };
    },
};
