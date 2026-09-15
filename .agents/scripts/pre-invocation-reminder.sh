#!/usr/bin/env bash
# Antigravity PreInvocation Hook
# Injects prompt-time lifecycle reminder to verify git branch and test requirements

CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

cat <<EOF
{
  "injectSteps": [
    {
      "ephemeralMessage": "[Antigravity Workflow Reminder] Current branch: '${CURRENT_BRANCH}'. Remember: Ensure latest main is pulled ('git pull origin main'), create a new task branch ('feat/...', 'fix/...'), verify WCAG AA standards, run all tests ('npm run test:unit && npm run test:e2e'), and push verified branch to origin."
    }
  ]
}
EOF
