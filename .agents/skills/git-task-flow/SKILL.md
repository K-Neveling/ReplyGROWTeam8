---
name: git-task-flow
description: >-
  Executes the standardized Git task lifecycle: syncs with latest main, creates a feature branch, runs test suites, and pushes to GitHub.
---

# Git Task Flow Skill

This skill provides step-by-step instructions and executable scripts to manage the lifecycle of any task or user prompt.

---

## Workflow Sequence

### Step 1: Sync with Latest Main

Whenever starting a new prompt or task, synchronize the local repository with the remote `main` branch.

Run the helper script:

```bash
./.agents/skills/git-task-flow/scripts/sync-main.sh
```

Or execute manually:

```bash
git status
# If there are changes: git stash --include-untracked
git checkout main
git pull origin main
```

### Step 2: Create a Task Branch

Determine the appropriate branch type (`feat`, `fix`, `test`, `refactor`, `chore`) and task name.

Run the helper script:

```bash
./.agents/skills/git-task-flow/scripts/new-task-branch.sh <branch-type> <task-name>
# Example: ./.agents/skills/git-task-flow/scripts/new-task-branch.sh feat user-dashboard
```

Or execute manually:

```bash
git checkout -b <branch-type>/<task-name>
```

### Step 3: Implement Changes & Write Tests

1. Write the code following [coding-standards.md](../../rules/coding-standards.md).
2. Ensure WCAG AA compliance using [wcag-accessibility.md](../../rules/wcag-accessibility.md).
3. Add unit tests in `tests/unit/` and E2E tests in `tests/e2e/`.

### Step 4: Verify and Push

Once development is complete, run the automated test suite and push the branch.

Run the helper script:

```bash
./.agents/skills/git-task-flow/scripts/run-and-push.sh "<commit message>"
# Example: ./.agents/skills/git-task-flow/scripts/run-and-push.sh "feat(dashboard): add interactive KPI metric cards"
```

Or execute manually:

```bash
npm run format:check
npm run lint
npm run test:unit
npm run test:e2e
git add .
git commit -m "<commit message>"
git push -u origin $(git branch --show-current)
```
