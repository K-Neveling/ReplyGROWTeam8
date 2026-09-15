# Google Antigravity Agent Guidelines — Reply GROW Team 8

Welcome to the **Reply GROW Team 8** repository. This document serves as the master instruction set for all Google Antigravity (AGY) agents, CLI sessions, and subagents operating in this workspace.

---

## 1. Core Operating Principles

1. **Prompt-to-Git Lifecycle is Mandatory**: Every user prompt initiates a disciplined Git workflow. Never write or edit code directly on `main` without a dedicated task branch.
2. **Professional Code Quality**: All code must conform to modern Node.js/Express standards, clean architecture, ESLint flat config, Prettier formatting, and complete documentation.
3. **Accessibility (WCAG 2.1/2.2 AA) First**: Every UI view, component, and interaction must meet WCAG AA standards. Accessibility is a fundamental acceptance criterion, not an afterthought.
4. **Test-Driven Rigor**: Every feature must include both **Unit Tests** (routes, logic, utilities via Vitest) and **E2E Tests** (user journeys and automated accessibility audits via Playwright + Axe).
5. **Hackathon Velocity & Demo Readiness**: Build modular, resilient, and visually captivating interfaces. Prioritize working MVPs, interactive dynamic feedback, clean error recovery, and seeded demo data.

---

## 2. Mandatory Git Lifecycle (On EVERY Prompt / Task)

Whenever a new user prompt or task is received, the agent **MUST** execute the following sequence:

```
[New Prompt Received]
       │
       ▼
 1. Check Git Status & Stash dirty work (if any)
       │
       ▼
 2. Switch to 'main' branch
       │
       ▼
 3. Pull latest changes from remote ('git pull origin main')
       │
       ▼
 4. Create & checkout a new task branch ('git checkout -b <type>/<task-name>')
       │
       ▼
 5. Implement requested changes (Code + Unit/E2E Tests + WCAG styling)
       │
       ▼
 6. Run formatters & linters ('npm run format:check && npm run lint')
       │
       ▼
 7. Run test suites ('npm run test:unit && npm run test:e2e')
       │
       ├─── [Tests Fail] ──► Fix issues and re-test (Do NOT push failing code)
       │
       ▼ [All Tests Pass]
 8. Commit changes using Conventional Commits ('git commit -m "..."')
       │
       ▼
 9. Push new branch to remote repository ('git push -u origin <branch-name>')
       │
       ▼
10. Report completion, branch name, test status, and next steps to the user
```

### Git Command Reference for the Agent

1. **Ensure on latest `main`**:

   ```bash
   git status
   # If uncommitted changes exist, stash them:
   # git stash --include-untracked
   git checkout main
   git pull origin main
   ```

   _(Note: On an initial repository without remote commits, verify default branch is `main`)_

2. **Branch Naming Standard**:
   - Features: `feat/<short-description>` (e.g., `feat/auth-flow`, `feat/dashboard-cards`)
   - Fixes: `fix/<short-description>` (e.g., `fix/aria-contrast`, `fix/api-route-error`)
   - Testing: `test/<short-description>` (e.g., `test/e2e-navigation`, `test/a11y-audit`)
   - Docs / Chore: `chore/<short-description>` or `docs/<short-description>`

3. **Verification Before Push**:

   ```bash
   npm run lint
   npm run test:unit
   npm run test:e2e
   ```

4. **Commit & Push**:
   ```bash
   git add .
   git commit -m "<type>(<scope>): <concise description of changes>"
   git push -u origin <branch-name>
   ```

---

## 3. Technology Stack & Architectural Constraints

- **Runtime**: Node.js (v20+ LTS / v22 Current, native ES Modules `"type": "module"`).
- **Backend Framework**: Express.js with async router handlers, structured middleware, and centralized error handling.
- **Frontend Architecture**:
  - Modern Semantic HTML5 + CSS Custom Properties (CSS variables for theming, typography, spacing).
  - Modern UI: Glassmorphism / neumorphic accent accents, responsive CSS Grid / Flexbox, CSS animations with `prefers-reduced-motion` fallbacks.
  - Vanilla modern ES client-side JavaScript (or componentized micro-frontends) with zero bloat for instant hackathon load times.
- **Testing Framework**:
  - **Unit & Integration**: Vitest + Supertest (instant ESM testing for controllers, utilities, and API endpoints).
  - **E2E & Accessibility**: Playwright with `@axe-core/playwright` for cross-browser testing and zero-tolerance WCAG a11y violations.
- **Code Quality**: Flat ESLint (`eslint.config.js`), Prettier (`.prettierrc`), `.editorconfig`.

---

## 4. WCAG Accessibility Standards (Mandatory AA Checklist)

Every interface developed must strictly adhere to the following rules:

1. **Semantic Structure**:
   - Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
   - Never use `<div>` or `<span>` when `<button>`, `<a>`, or `<input>` is semantically required.
   - Include a hidden-until-focused **"Skip to main content"** link at the top of every page.
2. **Keyboard Accessibility**:
   - All interactive elements must be focusable via `Tab` and activatable via `Enter` / `Space`.
   - Never remove outline without providing a visible custom `:focus-visible` state.
   - Modals and drawers must trap focus and close on `Escape`.
3. **Contrast Ratios**:
   - Normal text (under 18pt / 14pt bold): Minimum **4.5:1** contrast ratio against background.
   - Large text: Minimum **3:1** contrast ratio.
   - UI components, icons, and borders: Minimum **3:1** contrast ratio.
4. **ARIA & Assistive Tech**:
   - Provide `aria-label` or `aria-labelledby` on icon buttons and inputs without visible labels.
   - Use `aria-live="polite"` or `"assertive"` for dynamic DOM updates and toast notifications.
   - All images must have meaningful `alt` text (or `alt=""` if strictly decorative).
5. **Touch & Click Targets**:
   - Minimum target size of **44x44px** for buttons and interactive controls.

---

## 5. Hackathon Design & Velocity Rules

1. **Fast-to-Interactive**: Ensure the application starts instantly (`npm run dev` / `npm start`).
2. **Demo-Ready Resilience**:
   - Provide mocked or seeded data fallbacks for all external APIs so the application never breaks during a live presentation.
   - Graceful offline and error states (toast notifications, accessible banner alerts).
3. **Modern Visual Polish**:
   - Dark and Light mode support using CSS variables and `prefers-color-scheme`.
   - Smooth micro-interactions, subtle elevation shadows, distinct typography hierarchy.
4. **Clean Code over Shortcuts**: Fast hackathon pace must not compromise code structure. Keep files modular (`routes/`, `controllers/`, `middleware/`, `public/css/`, `public/js/`).

---

## 6. Directory Map

```text
.
├── .agents/
│   ├── rules/
│   │   ├── git-workflow.md
│   │   ├── coding-standards.md
│   │   ├── wcag-accessibility.md
│   │   ├── testing-strategy.md
│   │   └── hackathon-architecture.md
│   ├── skills/
│   │   ├── git-task-flow/
│   │   │   ├── SKILL.md
│   │   │   └── scripts/
│   │   └── a11y-audit/
│   │       └── SKILL.md
│   └── hooks.json
├── .github/
│   ├── workflows/ci.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── src/
│   ├── server.js
│   ├── app.js
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── public/ (html, css, js)
├── tests/
│   ├── unit/
│   └── e2e/
├── AGENTS.md
└── package.json
```

---

## 7. Immediate Action Checklist for Any Task

When given a task:

- [ ] Stash / clean working directory
- [ ] Checkout `main` and run `git pull origin main`
- [ ] Create branch `feat/...` or `fix/...`
- [ ] Implement code changes adhering to WCAG and file formatting
- [ ] Write/update unit tests & E2E tests
- [ ] Run `npm run lint` & `npm run test`
- [ ] Commit with Conventional Commits
- [ ] Push to `origin <branch-name>`
- [ ] Output branch summary and test results to user
