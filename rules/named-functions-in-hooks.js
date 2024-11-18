module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce named functions in React hooks",
      category: "Best Practices",
      recommended: true,
    },
    schema: [],
    messages: {
      useNamedFunctions: "Only named functions are allowed in {{hook}}.",
    },
  },
  create(context) {
    const reactHooks = ["useEffect", "useMemo", "useCallback"];

    return {
      CallExpression(node) {
        // Check if the function being called is a React hook
        const { callee } = node;

        let hookName = null;

        // Case 1: Importing hooks directly (e.g., useEffect)
        if (callee.type === "Identifier" && reactHooks.includes(callee.name)) {
          hookName = callee.name;
        }

        // Case 2: Accessing hooks via React namespace (e.g., React.useEffect)
        if (
          callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "React" &&
          callee.property.type === "Identifier" &&
          reactHooks.includes(callee.property.name)
        ) {
          hookName = callee.property.name;
        }

        if (hookName) {
          // Check if the first argument is an anonymous function
          const firstArg = node.arguments[0];
          if (
            firstArg &&
            (firstArg.type === "ArrowFunctionExpression" ||
              firstArg.type === "FunctionExpression") &&
            !firstArg.id // Anonymous functions have no `id`
          ) {
            context.report({
              node: firstArg,
              messageId: "useNamedFunctions",
              data: {
                hook: hookName,
              },
            });
          }
        }
      },
    };
  },
};
