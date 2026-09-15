# Reply GROW Team 8 — Hackathon Platform

An enterprise-standard Node.js and Express web application engineered for hackathons with strict **WCAG 2.1 AA Accessibility**, modern responsive dynamic UI design, full unit & end-to-end testing infrastructure, and autonomous **Google Antigravity** instruction configuration.

---

## 🌟 Key Features

- **Google Antigravity Customization**: Pre-configured with `.agents/rules/`, `.agents/skills/`, and lifecycle hooks to automate task workflows, enforce professional formatting, run full test suites, and execute disciplined Git branching and pushing.
- **Strict WCAG 2.1 AA Accessibility**:
  - High-contrast color system (≥4.5:1 text, ≥3:1 UI controls) in both Light and Dark modes.
  - Skip-to-content landmark navigation.
  - Full keyboard accessibility with visible `:focus-visible` indicators and focus trapping.
  - ARIA tablist patterns and live regions (`aria-live="polite"`) for dynamic DOM announcements.
  - Automated zero-violation Axe accessibility scans in CI.
- **Modern Dynamic Architecture**:
  - Node.js & Express with native ES Modules (`"type": "module"`).
  - Fast responsive CSS Grid & Flexbox, smooth micro-interactions, dark/light theme switching.
  - In-memory mock seed data fallbacks for hackathon demo resilience.
- **Complete Testing Infrastructure**:
  - **Unit & Integration**: Vitest + Supertest.
  - **End-to-End & A11y**: Playwright + `@axe-core/playwright`.
- **Automated Git Lifecycle**:
  - Pull and sync latest `main` on every prompt.
  - Create semantic task branch (`feat/...`, `fix/...`, `test/...`).
  - Verify formatting, linting, unit tests, and E2E tests before push.
  - Automated push to GitHub with Conventional Commits.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers (For E2E & A11y Testing)

```bash
npx playwright install --with-deps chromium
```

### 3. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification Commands

| Command                | Description                                                     |
| :--------------------- | :-------------------------------------------------------------- |
| `npm test`             | Runs both Unit and E2E test suites                              |
| `npm run test:unit`    | Executes fast in-memory API & utility unit tests via Vitest     |
| `npm run test:e2e`     | Runs Playwright browser user-journey and UI tests               |
| `npm run test:a11y`    | Executes automated WCAG 2.1 AA scans via `@axe-core/playwright` |
| `npm run lint`         | Checks code against ESLint flat configuration                   |
| `npm run format:check` | Verifies Prettier formatting                                    |
| `npm run format`       | Auto-formats code across the entire codebase                    |

---

## 🌿 Mandatory Agent Git Flow

Google Antigravity adheres to the following workflow on **every prompt or task**:

```bash
# 1. Sync local main with remote repository
npm run git:sync

# 2. Create a new task branch
npm run git:branch feat <task-name>

# 3. Implement feature, update tests & verify WCAG AA
# ...

# 4. Verify formatting, run unit & e2e tests, commit and push to GitHub
npm run git:push "feat(scope): descriptive message"
```

---

## 📁 Repository Structure

```text
ReplyGROWTeam8/
├── .agents/                          # Google Antigravity Configuration
│   ├── rules/
│   │   ├── git-workflow.md           # Mandatory Git task lifecycle
│   │   ├── coding-standards.md       # Professional formatting & clean architecture
│   │   ├── wcag-accessibility.md     # WCAG 2.1/2.2 AA design constraints
│   │   ├── testing-strategy.md       # Vitest + Playwright testing protocols
│   │   └── hackathon-architecture.md # Hackathon speed & demo resilience
│   ├── skills/
│   │   ├── git-task-flow/            # Executable Git lifecycle scripts
│   │   └── a11y-audit/               # WCAG compliance runbook
│   ├── scripts/                      # PreInvocation reminder scripts
│   └── hooks.json                    # Antigravity lifecycle hooks
├── .github/
│   ├── workflows/ci.yml              # GitHub Actions automated test & a11y CI
│   └── PULL_REQUEST_TEMPLATE.md      # PR checklist template
├── src/
│   ├── server.js                     # Server listener with graceful shutdown
│   ├── app.js                        # Express app, security middleware & router mount
│   ├── routes/                       # API and page routers
│   ├── middleware/                   # Centralized error handler & security
│   ├── utils/                        # Data validators & helpers
│   └── public/                       # HTML5, CSS3, dynamic vanilla JavaScript
├── tests/
│   ├── unit/                         # Vitest unit tests
│   └── e2e/                          # Playwright E2E and Axe accessibility tests
├── AGENTS.md                         # Master Antigravity instruction file
├── GEMINI.md                         # Compatibility rules file
├── package.json                      # Scripts & dependencies
└── README.md
```
