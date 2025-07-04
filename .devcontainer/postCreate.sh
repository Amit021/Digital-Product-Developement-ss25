#!/usr/bin/env bash
set -euo pipefail

echo "🔧  Installing root-level dependencies (if any)…"
if [[ -f package.json ]]; then
  npm install
fi

echo "🔧  Installing back-end dependencies and generating Prisma client…"
pushd backend > /dev/null
npm install
npx prisma generate
popd > /dev/null

echo "🔧  Installing Expo app dependencies…"
pushd sturzdoku/sturzdoku > /dev/null
npm install
popd > /dev/null

echo "✅  postCreate.sh finished successfully!"
