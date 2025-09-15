#!/bin/bash
set -euo pipefail

log() {
  echo -e "\n$1"
}

run_step() {
  local name="$1"
  shift
  log "$name..."
  local start=$(date +%s)
  "$@"
  local end=$(date +%s)
  local duration=$((end - start))
  echo "✅ ${name/…/} completed in ${duration}s"
}

# Track total time
BUILD_START=$(date +%s)

echo "🚀 Starting build..."

run_step "🧹 Cleaning dist folder" rimraf dist
run_step "🔄 Generating Prisma client" pnpm prisma generate
run_step "🔍 Running type-check" pnpm type-check
run_step "🏗️ Compiling with tsc" tsc --skipLibCheck
run_step "🔧 Running tsc-alias" tsc-alias

BUILD_END=$(date +%s)
TOTAL_DURATION=$((BUILD_END - BUILD_START))

echo -e "\n🎉 Build completed successfully in ${TOTAL_DURATION}s!"
