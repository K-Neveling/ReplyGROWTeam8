#!/usr/bin/env bash
set -e

BRANCH_TYPE=${1:-feat}
TASK_NAME=${2:-new-task}

# Normalize branch name to lowercase kebab-case
TASK_NAME=$(echo "$TASK_NAME" | tr '[:upper:]' '[:lower:]' | tr -s ' ' '-' | tr -cd '[:alnum:]-')
BRANCH_NAME="${BRANCH_TYPE}/${TASK_NAME}"

echo "🌿 [Git Flow] Creating and checking out branch: ${BRANCH_NAME}..."
git checkout -b "${BRANCH_NAME}"

echo "✅ [Git Flow] Active branch is now: ${BRANCH_NAME}"
