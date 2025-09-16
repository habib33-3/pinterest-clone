#!/bin/sh
set -euo pipefail

# Security: Validate required environment variables
: "${DATABASE_URL:?DATABASE_URL environment variable is required}"
: "${NODE_ENV:=production}"

echo "🔍 Environment: $NODE_ENV"
echo "🚀 Running Prisma migrations..."

# Security: Use exec form and validate schema path
if [ ! -f "./prisma/schema.prisma" ]; then
    echo "❌ Error: Prisma schema not found at ./prisma/schema.prisma"
    exit 1
fi

# Performance: Skip migration in development if needed
if [ "$NODE_ENV" = "production" ] || [ "${FORCE_MIGRATE:-true}" = "true" ]; then
    pnpm exec prisma migrate deploy --schema ./prisma/schema.prisma
    echo "✅ Prisma migrations applied"
else
    echo "⚠️  Skipping migrations in development mode"
fi

echo "📦 Starting backend server..."

# Security: Use exec to replace shell process with node process
exec node dist/server.js
