# Hotel & Spa Omnichannel Feedback & Fleet Reliability Platform

An enterprise-grade hotel and spa guest feedback, maintenance dispatch, and equipment intelligence platform engineered for hackathons with strict **WCAG 2.1/2.2 AA Accessibility**, modern responsive dynamic UI design, full unit & end-to-end testing infrastructure, and autonomous **Google Antigravity** instruction configuration.

---

## 🏨 Project Overview & Core Capabilities

Luxury hospitality properties suffer from disjointed feedback channels (verbal complaints, sticky notes, scattered emails) and lack verifiable accountability for maintenance interventions. Furthermore, when equipment breaks across multiple hotels, management lacks fleet-wide visibility to identify unreliable brands.

This platform provides a centralized, omnichannel solution:

1. **Centralized Omnichannel Ingestion**: A shared database and unified API ingest feedback from communal tablets, contextual appliance QR codes, responsive mobile web, and front desk staff entries.
2. **Hybrid & Accessible Guest Experience (iPads vs. QR Codes)**:
   - **Communal Area Tablets (e.g. iPads)**: High-contrast, large-touch-target kiosks in lobbies, spa lounges, and gym entrances for general feedback ("Room too hot", cleanliness, compliments).
   - **Contextual Appliance QR Codes**: Affixed directly to equipment (in-room espresso machines, gym bikes, sauna panels) with **pre-seeded prompt trees** (e.g. "Out of milk / pods", "Not heating", "Leaking") plus freeform input.
3. **Staff Accountability & Verifiable Maintenance Audit Trail**:
   - Authenticated staff backend login portal.
   - Granular tracking of who claims ("picks up") each ticket and who completes maintenance work.
   - Immutable, tamper-evident audit log ensuring 100% traceability to specific staff accounts.
4. **Manager Escalation & Personalized Service Recovery**:
   - Real-time escalation of high-urgency issues or guest queries to on-duty managers.
   - Enables managers to conduct in-person room visits or offer proactive amenities before guest checkout.
5. **Multi-Hotel Fleet Reliability & Equipment Trend Analytics**:
   - Tracks common equipment brands and models across all hotel properties in the group.
   - Automatically flags systemic failure patterns (e.g., a specific brand of gym bike repeatedly breaking across properties).
   - Generates proactive **Reliability Investigation Tickets** for procurement and facilities leadership to evaluate vendor alternatives.

---

## 📚 Project Documentation

- 📐 **[System Design & Architecture Specification](docs/SYSTEM_DESIGN.md)**: Deep dive into the omnichannel architecture, hybrid iPad vs. QR strategy, RBAC audit engine, fleet reliability analytics, database schema, and REST API contract.
- 📋 **[Functional & Non-Functional Requirements](docs/REQUIREMENTS.md)**: User personas, functional requirements (FR-1 through FR-7), WCAG AA compliance criteria, and user stories.
- 🗺️ **[Product & Implementation Roadmap](docs/ROADMAP.md)**: Phase 1 (Hackathon MVP), Phase 2 (Multi-Hotel Fleet Rollout), and Phase 3 (AI & IoT Predictive Maintenance).

---

## 🌟 Platform Highlights

- **Google Antigravity Customization**: Pre-configured with `.agents/rules/`, `.agents/skills/`, and lifecycle hooks to automate task workflows, enforce professional formatting, run full test suites, and execute disciplined Git branching and pushing.
- **Strict WCAG 2.1/2.2 AA Accessibility**:
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
  - Create semantic task branch (`feat/...`, `fix/...`, `docs/...`).
  - Verify formatting, linting, unit tests, and E2E tests before push.
  - Automated push to GitHub with Conventional Commits.

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
├── docs/                             # Architecture & Specifications
│   ├── SYSTEM_DESIGN.md              # Omnichannel architecture & database schema
│   ├── REQUIREMENTS.md               # Functional & WCAG AA requirements
│   └── ROADMAP.md                    # MVP & enterprise rollout phases
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
