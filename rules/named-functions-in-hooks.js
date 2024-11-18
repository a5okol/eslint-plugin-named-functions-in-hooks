module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Only allow named functions in React hooks (useMemo, useCallback, useEffect)',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      namedFunctionOnly: 'Only named functions are allowed in {{hook}}.',
    },
    schema: [], // No options
  },
  create(context) {
    const hooksToCheck = ['useMemo', 'useCallback', 'useEffect'];

    return {
      CallExpression(node) {
        const callee = node.callee.name;

        // Check if the function is one of the hooks
        if (hooksToCheck.includes(callee)) {
          const firstArg = node.arguments[0];

          if (
            firstArg &&
            (firstArg.type === 'ArrowFunctionExpression' ||
              firstArg.type === 'FunctionExpression')
          ) {
            context.report({
              node: firstArg,
              messageId: 'namedFunctionOnly',
              data: {
                hook: callee,
              },
            });
          }
        }
      },
    };
  },
};
