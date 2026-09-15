#!/usr/bin/env bash
set -e

# Sync with latest main branch
echo "🔄 [Git Flow] Checking working tree status..."

if [[ -n $(git status --porcelain) ]]; then
  echo "⚠️  [Git Flow] Stashing uncommitted local changes..."
  git stash save "agent-auto-stash-$(date +%s)"
fi

echo "🌿 [Git Flow] Switching to main..."
git checkout main

echo "⬇️  [Git Flow] Pulling latest changes from origin/main..."
if git ls-remote --exit-code --heads origin main >/dev/null 2>&1; then
  git pull origin main
else
  echo "ℹ️  [Git Flow] Remote main has not been pushed yet. Local main is up to date."
fi

echo "✅ [Git Flow] Successfully synchronized on main."
