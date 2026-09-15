---
description: Mandatory Git task lifecycle: pull latest main, create feature branch, execute task, run tests, and push to GitHub.
trigger: always_on
---

# Git Workflow & Lifecycle Specification

This rule is **strictly mandatory** for all code changes, bug fixes, refactoring, and feature additions executed by the agent in this repository.

## 1. On Every New Prompt / Task

Before modifying any file, the agent must ensure the working directory is synchronized with the latest remote `main` branch.

### Execution Steps:

1. **Inspect status and preserve uncommitted changes**:
   ```bash
   git status
   ```
   If uncommitted changes exist from prior incomplete runs:
   ```bash
   git stash save "agent-auto-stash-$(date +%s)"
   ```
2. **Switch to main and pull latest remote commits**:
   ```bash
   git checkout main
   git pull origin main
   ```
   _(If the remote repository is brand new with no commits, ensure local default branch is `main`)_
3. **Generate a descriptive branch name**:
   - Follow semantic branch naming: `<type>/<kebab-case-description>`
   - `feat/` for new features or UI capabilities (e.g. `feat/dashboard-stats`, `feat/accessible-navbar`)
   - `fix/` for bug fixes or accessibility corrections (e.g. `fix/wcag-contrast-button`, `fix/api-status-code`)
   - `test/` for testing infrastructure or new test suites (e.g. `test/playwright-e2e-auth`)
   - `refactor/` for code cleanup without behavior change (e.g. `refactor/modular-express-routes`)
   - `chore/` for dependency updates or build configs (e.g. `chore/eslint-config`)
4. **Create and switch to the task branch**:
   ```bash
   git checkout -b <type>/<kebab-case-description>
   ```

---

## 2. Implementing the Task

1. Implement only the requested scope.
2. Adhere to professional file formatting standards (Prettier & ESLint).
3. Ensure all user interface additions satisfy WCAG 2.1 AA.
4. Add or update corresponding **unit tests** (`tests/unit/*.test.js`) and **E2E tests** (`tests/e2e/*.spec.js`).

---

## 3. Pre-Push Verification

Before any commit or push, execute full verification:

```bash
# 1. Check code formatting and linting
npm run format:check
npm run lint

# 2. Run unit tests
npm run test:unit

# 3. Run end-to-end tests and accessibility audits
npm run test:e2e
```

> [!CRITICAL]
> If any test fails, do **NOT** push. You must inspect the failure, fix the underlying problem, and re-run the tests until 100% green.

---

## 4. Commit and Push

Once all verification steps pass:

1. **Stage changes**:
   ```bash
   git add .
   ```
2. **Commit with Conventional Commits**:
   ```bash
   git commit -m "<type>(<scope>): <concise description>"
   ```
   Examples:
   - `feat(ui): add accessible hero section and live announcements`
   - `fix(a11y): improve color contrast ratio on call-to-action buttons`
   - `test(e2e): add playwright automated axe accessibility regression tests`
3. **Push the branch to the GitHub repository**:
   ```bash
   git push -u origin <branch-name>
   ```
4. **User Notification**:
   In your response to the user, include:
   - The created branch name (e.g., `feat/accessible-navbar`)
   - Summary of changes implemented
   - Summary of passing unit and E2E test results
   - The remote branch link or push confirmation
