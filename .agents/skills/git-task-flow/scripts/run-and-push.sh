#!/usr/bin/env bash
set -e

COMMIT_MSG=${1:-"feat: update application functionality"}
CURRENT_BRANCH=$(git branch --show-current)

if [[ "$CURRENT_BRANCH" == "main" ]]; then
  echo "❌ [Git Flow Error] Refusing to push directly from 'main'. Please create a task branch first!"
  exit 1
fi

echo "🔍 [Verification] Checking formatting..."
npm run format:check || {
  echo "⚠️ Formatting issue detected. Running npm run format..."
  npm run format
}

echo "🔍 [Verification] Running ESLint..."
npm run lint

echo "🧪 [Verification] Running Unit & Integration tests..."
npm run test:unit

echo "🌐 [Verification] Running E2E & Accessibility tests..."
npm run test:e2e

echo "📦 [Git Flow] Staging changes..."
git add .

echo "💾 [Git Flow] Committing changes..."
git commit -m "$COMMIT_MSG"

echo "🚀 [Git Flow] Pushing branch '${CURRENT_BRANCH}' to origin..."
git push -u origin "$CURRENT_BRANCH"

echo "🎉 [Git Flow] Successfully verified and pushed '${CURRENT_BRANCH}' to GitHub!"
