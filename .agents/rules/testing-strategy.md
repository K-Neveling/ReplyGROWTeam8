---
description: Testing guidelines, framework configuration, unit testing, and E2E testing with Playwright.
trigger: always_on
---

# Testing Strategy & Infrastructure Specification

Quality and test coverage are non-negotiable. Every change or newly introduced functionality must have accompanying unit and/or E2E tests.

---

## 1. Test Layer Architecture

```text
tests/
├── unit/                         # Fast, in-memory execution (Vitest)
│   ├── api.test.js               # Route endpoints and HTTP status codes (Supertest)
│   └── validator.test.js         # Pure functions, utilities, schema parsing
└── e2e/                          # Real browser automation (Playwright)
    ├── app.spec.js               # User flows, DOM interactions, responsive viewports
    └── a11y.spec.js              # Automated Axe accessibility scans (WCAG 2.1 AA)
```

---

## 2. Unit & Integration Testing (Vitest + Supertest)

- **Execution Command**: `npm run test:unit`
- **Scope**:
  - Test pure utility functions for edge cases, null handling, and type safety.
  - Test Express route handlers using `supertest(app)`:
    - Happy path (status 200/201, expected response body structure).
    - Validation error path (status 400 with descriptive error code).
    - Not found path (status 404).
    - Server error handling (status 500 without leaking stack traces).
- **Style**:
  ```javascript
  import { describe, it, expect } from 'vitest';
  import request from 'supertest';
  import app from '../../src/app.js';

  describe('GET /api/v1/health', () => {
    it('returns healthy status with 200 OK', async () => {
      const res = await request(app).get('/api/v1/health');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });
  ```

---

## 3. End-to-End Testing (Playwright)

- **Execution Command**: `npm run test:e2e`
- **Scope**:
  - Real browser verification of core user journeys.
  - Keyboard navigation testing (verifying focus moves correctly with `Tab` and `Shift+Tab`).
  - Form submissions and UI validation state feedback.
  - Theme toggling (Dark/Light mode) and dynamic DOM updates.
- **Accessibility E2E Suite (`tests/e2e/a11y.spec.js`)**:
  - Automatically analyzes every major route using `@axe-core/playwright`.
  - Violations fail the build with actionable remediation reports.

---

## 4. Test Execution Requirements Before Push

Before committing any branch or pushing to GitHub, you **MUST** run:

```bash
# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e
```

All test runs must exit with code 0. If a test fails, analyze the test failure output, repair the code or test specification, and rerun.
