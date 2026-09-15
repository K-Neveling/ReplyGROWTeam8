---
description: Code quality, file formatting, Node.js/Express clean architecture, and linting guidelines.
trigger: always_on
---

# Professional Coding & File Formatting Standards

Every file created or modified in this repository must maintain enterprise-grade code cleanliness, readability, and consistency.

## 1. File Formatting Standards

- **Encoding & Line Endings**: UTF-8 without BOM, LF (`\n`) line endings.
- **Indentation**: 2 spaces (no tabs).
- **Line Length**: Max 100 characters for JavaScript/CSS; soft wrap for Markdown.
- **Semicolons**: Always include semicolons in JavaScript.
- **Quotes**: Single quotes `'` for JavaScript strings; double quotes `"` for JSON and HTML attributes.
- **Trailing Commas**: ES5 multi-line trailing commas enabled (arrays, objects).
- **Formatting Command**: Use `npm run format` to apply Prettier, and `npm run format:check` to verify in CI.

---

## 2. Directory Architecture & Layer Separation

Code must be strictly segregated by responsibility:

```text
src/
├── app.js               # Express application setup, security middleware, routing mounts
├── server.js            # Port binding, graceful shutdown hooks, process listeners
├── routes/              # Express Router definitions, request parameter validation
├── controllers/         # (Optional/Recommended) Business logic and controller handlers
├── middleware/          # Security headers, auth checks, error handlers, request logging
├── utils/               # Pure helper functions, string formatters, schema validators
└── public/              # Client-facing static assets (HTML, CSS, JS, SVG assets)
```

Rules:

1. **Never write inline business logic inside route definition files** when complexity exceeds 10 lines; delegate to controllers or utils.
2. **Never expose raw stack traces in responses**: Use the centralized error handler in `src/middleware/errorHandler.js`.
3. **Always use standard HTTP response wrappers**:
   ```json
   {
     "success": true,
     "data": { ... },
     "meta": { "timestamp": "..." }
   }
   ```
   Or for errors:
   ```json
   {
     "success": false,
     "error": {
       "code": "BAD_REQUEST",
       "message": "Human readable explanation"
     }
   }
   ```

---

## 3. Modern JavaScript & Node.js Practices

- **Native ES Modules**: Use standard `import` / `export` syntax (`"type": "module"` in `package.json`). Never mix with `require()`.
- **Async/Await & Error Handling**: All asynchronous code must use `async/await` with appropriate `try/catch` or express `express-async-errors` / middleware forwarders.
- **JSDoc Annotations**: Public functions, route handlers, and complex utilities must include JSDoc docstrings:
  ```javascript
  /**
   * Validates and sanitizes a user submission payload.
   * @param {Record<string, unknown>} payload - Raw incoming user data.
   * @returns {{ isValid: boolean, errors: string[] }} Validation result.
   */
  ```
- **Environment Variables**: Never hardcode configuration, ports, secrets, or API tokens. Always use `process.env` with sensible local fallbacks.
- **No Unused Code**: Clean up dead imports, commented-out dead code, and temporary `console.log` statements before committing. Use structured logging or `console.error` only for legitimate operational alerts.
