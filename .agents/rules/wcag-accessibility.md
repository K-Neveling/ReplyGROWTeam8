---
description: Design constraints and mandatory rules for WCAG 2.1 & 2.2 AA accessibility compliance.
trigger: always_on
---

# Web Content Accessibility Guidelines (WCAG 2.1 / 2.2 AA) Constraints

All user interfaces, templates, and dynamic client-side interactions in this project must adhere strictly to **WCAG 2.1/2.2 Level AA**. Failure to comply with accessibility standards is considered a blocking issue.

---

## 1. Semantic HTML & Document Hierarchy (WCAG 1.3.1, 2.4.1)

- **Landmarks**: Every page must have proper landmarks: `<header role="banner">`, `<nav aria-label="...">`, `<main id="main-content">`, `<footer role="contentinfo">`.
- **Skip Link**: The very first focusable element inside `<body>` must be:
  ```html
  <a href="#main-content" class="skip-link">Skip to main content</a>
  ```
  Styled with CSS to be visually hidden offscreen until focused via keyboard.
- **Headings Order**: Strictly linear heading levels (`<h1>` -> `<h2>` -> `<h3>`). Never skip levels (e.g. `<h1>` followed directly by `<h3>`). Exactly one `<h1>` per page.
- **Form Controls**: Every `<input>`, `<textarea>`, or `<select>` MUST have an associated `<label for="inputId">`. If a visual label is absent, use `<label for="..." class="sr-only">` or `aria-label`.

---

## 2. Color Contrast & Visual Design (WCAG 1.4.3, 1.4.11)

- **Text Contrast**:
  - Regular text (<18pt or <14pt bold): Contrast ratio of at least **4.5:1** against the background.
  - Large text (≥18pt or ≥14pt bold): Contrast ratio of at least **3.0:1**.
- **Non-Text Contrast**:
  - Buttons, form borders, focus rings, status badges, and chart elements: Minimum **3.0:1** contrast against adjacent backgrounds.
- **No Color-Only Information**: Never convey status (error, success, active state) purely by color. Always pair color with an icon, text label, or visible badge.

---

## 3. Keyboard Navigation & Focus Management (WCAG 2.1.1, 2.4.7)

- **Full Keyboard Operability**: Any action performed with a mouse must be performable via keyboard alone (`Tab`, `Shift+Tab`, `Enter`, `Space`, and Arrow keys where appropriate).
- **Focus Indicator**: Never use `outline: none` without providing an explicit, high-contrast `:focus-visible` state:
  ```css
  :focus-visible {
    outline: 2px solid var(--focus-ring-color, #2563eb);
    outline-offset: 2px;
  }
  ```
- **Focus Trapping**: In modal dialogs or mobile menus, focus must be trapped inside the active container while open and return to the triggering button when closed.
- **Touch Target Size**: Minimum interactive target size is **44x44px** (or 24x24px with at least 44px spacing).

---

## 4. Dynamic Content & Assistive Technology (WCAG 4.1.2, 4.1.3)

- **Screen Reader Announcements**:
  Use dedicated live regions for dynamic asynchronous updates (e.g., search results, submission status, filters):
  ```html
  <div id="live-announcer" class="sr-only" aria-live="polite" aria-atomic="true"></div>
  ```
- **Buttons vs. Links**:
  - Use `<a>` if navigating to a URL or page anchor.
  - Use `<button>` for actions, toggles, dialog opens, and form submits.
  - If a button contains only an icon, `aria-label="Action description"` is required.
- **Motion & Reduced Motion**:
  Always respect user motion preferences:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 5. Automated Verification

Every E2E test run must include an automated accessibility audit utilizing `@axe-core/playwright` (`tests/e2e/a11y.spec.js`).
Any violation of `critical` or `serious` impact will immediately fail the test suite.
