# eslint-plugin-named-functions-in-hooks

[](https://www.npmjs.com/package/eslint-plugin-named-functions-in-hooks)

This ESLint plugin enforces the use of **named functions** instead of anonymous functions in React hooks such as `useEffect`, `useCallback`, and `useMemo`. Using named functions improves readability, debugging, and reusability of code within React components.

- - -

## Why Use This Plugin?

### Benefits of Named Functions in Hooks:

1.  **Improved Debugging**:
    *   Named functions appear in stack traces, making debugging easier.
2.  **Code Reusability**:
    *   Reusable named functions prevent redundant logic and improve maintainability.
3.  **Readability**:
    *   Makes the intent of the function clearer, especially in complex components.

- - -

## Installation

Install the plugin via npm:

```
npm install eslint-plugin-named-functions-in-hooks --save-dev
```

- - -

## Usage

To enable the plugin in your ESLint configuration, add it to the `plugins` array and define the rule under `rules`:

### Example `.eslintrc.json`:

```
{
  "plugins": ["named-functions-in-hooks"],
  "rules": {
     "named-functions-in-hooks/named-functions-in-hooks": "error"
  }
}
```

- - -

## Rule Details

### Rule: `named-functions-in-hooks`

This rule ensures that only **named functions** are passed to React hooks (`useEffect`, `useCallback`, `useMemo`).

### Default Behavior

*   Disallows anonymous arrow functions and function expressions in the listed hooks.
*   Allows named functions and functions imported from other modules.

- - -

## Examples

### ✅ **Correct Code:**

Using named functions improves readability and debugging:

#### Named Function in `useEffect`:

```
  function logEffect() {
    console.log("Effect executed");
  }

  useEffect(logEffect, []);
```

#### Named Function in `useCallback`:

```
  function memoizedHandler() {
    console.log("Handler executed");
  }

  const handler = useCallback(memoizedHandler, []);
```

#### Named Function in `useMemo`:

```
  function computeExpensiveValue() {
    return someHeavyCalculation();
  }

  const memoizedValue = useMemo(computeExpensiveValue, [dependencies]);
```

- - -

### ❌ **Incorrect Code:**

These examples will trigger an ESLint error:

#### Anonymous Function in `useEffect`:

```
  useEffect(() => {
    console.log("Effect executed");
  }, []); // Error: Only named functions are allowed in useEffect.
```

#### Anonymous Function in `useCallback`:

```
  const handler = useCallback(() => {
    console.log("Handler executed");
  }, []); // Error: Only named functions are allowed in useCallback.
```

#### Anonymous Function in `useMemo`:

```
  const memoizedValue = useMemo(() => someHeavyCalculation(), [dependencies]); // Error: Only named functions are allowed in useMemo.
```

- - -

## How It Works

The plugin defines a custom ESLint rule that:

1.  **Targets specific React hooks** (`useEffect`, `useCallback`, and `useMemo`).
2.  **Checks the first argument** of the hook to determine if it is an anonymous function.
3.  **Reports an error** if the argument is an anonymous function.

The rule works with both functional and class components.

- - -

## Configuration Options

Currently, the rule does not support additional configuration. Future updates may add customization options (e.g., extending the list of hooks).

- - -

## Contributing

We welcome contributions to improve the plugin! Here’s how you can get started:

1.  Fork the repository and clone it locally.
2.  Install dependencies:
    
    ```
    npm install
    ```
    
4.  Implement your changes in the appropriate file (e.g., add a new feature or fix a bug).
5.  Write tests to ensure your changes work as expected.
6.  Open a pull request for review.

```
## License

This project is licensed under the MIT License.
```

## Feedback and Issues

If you encounter any issues or have suggestions for improvement, please open an issue in the [GitHub repository](https://github.com/a5okol/eslint-plugin-named-functions-in-hooks).

We’d love to hear your feedback and ideas!
