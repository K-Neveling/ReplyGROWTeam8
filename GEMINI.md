# Google Antigravity Rules — Reply GROW Team 8

This file is automatically loaded by Antigravity and Gemini coding assistants.
For the complete master instructions, refer to [AGENTS.md](./AGENTS.md).

## Core Directives Summary:

1. **Pull & Branch First**: On every new prompt, pull latest `main` (`git pull origin main`), then create a new task branch (`feat/...`, `fix/...`, `test/...`). Never develop on `main`.
2. **Professional File Formatting**: Clean ES modules, Prettier formatting, ESLint rules, clear separation of concerns.
3. **Full Testing**: Must run and pass `npm run test:unit` and `npm run test:e2e` prior to push.
4. **WCAG 2.1/2.2 AA Compliance**: Semantic HTML5, high contrast (>= 4.5:1), keyboard navigable, focus-visible styles, ARIA labels & live regions, automated axe tests.
5. **Verified Push**: After tests pass, commit with Conventional Commits and push the branch to GitHub (`git push -u origin <branch-name>`).
