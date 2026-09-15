---
name: a11y-audit
description: >-
  Audits the user interface for WCAG 2.1/2.2 AA accessibility violations using automated axe-core scans and manual keyboard navigation checks.
---

# Accessibility (WCAG AA) Audit Skill

Use this skill whenever building or refactoring UI components to verify full accessibility compliance.

---

## 1. Automated Axe Verification

Run the Playwright accessibility test suite:

```bash
npm run test:a11y
```

This test uses `@axe-core/playwright` to scan pages for:

- Color contrast (`color-contrast`)
- Image alt texts (`image-alt`)
- Form control labels (`label`)
- ARIA attribute correctness (`aria-*`)
- Heading order (`heading-order`)
- Landmark regions (`region`, `landmark-one-main`)

## 2. Keyboard Navigation Walkthrough

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Navigate the page using ONLY the keyboard:
   - Verify `Tab` moves focus sequentially through every interactive element.
   - Verify `Shift+Tab` navigates in reverse order.
   - Verify a high-contrast focus ring (`:focus-visible`) is visible around every focused element.
   - Verify pressing `Enter` or `Space` on buttons and interactive elements triggers the corresponding action.
   - Verify `Escape` closes active modal dialogs and dropdowns.

## 3. Screen Reader & Live Region Check

- Ensure that dynamic data changes (such as filtering, form submission results, or error messages) update an element with `aria-live="polite"` or `role="alert"`.
- Ensure buttons without text have descriptive `aria-label` attributes.
