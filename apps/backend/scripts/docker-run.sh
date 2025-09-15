#!/bin/sh
set -euo pipefail

echo "🚀 Running Prisma migrations..."
pnpm --filter pinterest-clone-backend exec prisma migrate deploy \
  --schema ./prisma/schema.prisma

echo "✅ Prisma migrations applied"

echo "📦 Starting backend..."
exec node dist/server.js
