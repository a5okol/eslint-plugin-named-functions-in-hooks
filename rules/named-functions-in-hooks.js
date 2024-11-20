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
        const { callee } = node;
        let hookName = null;

        // Case 1: Directly imported hooks (e.g., useEffect)
        if (callee.type === "Identifier" && reactHooks.includes(callee.name)) {
          hookName = callee.name;
        }

        // Case 2: Namespace imports (e.g., React.useEffect)
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
          const firstArg = node.arguments[0];

          // Ensure the first argument is a function
          if (
            firstArg &&
            (firstArg.type === "ArrowFunctionExpression" || firstArg.type === "FunctionExpression")
          ) {
            const isAnonymousFunction = !firstArg.id;

            // Correctly handle function expressions with names
            if (firstArg.type === "FunctionExpression" && firstArg.id) {
              return; // Valid named function; no error
            }

            if (isAnonymousFunction) {
              context.report({
                node: firstArg,
                messageId: "useNamedFunctions",
                data: { hook: hookName },
              });
            }
          }
        }
      },
    };
  },
};
