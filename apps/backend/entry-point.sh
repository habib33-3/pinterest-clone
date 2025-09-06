#!/bin/sh
set -e

# Debug: show current files
# ls apps/backend/src/ -R

echo "Running Prisma migrations..."
pnpm --filter pinterest-clone-backend exec prisma migrate deploy --schema ./prisma/schema.prisma

echo "Running Prisma seed..."
# pnpm --filter pinterest-clone-backend exec npx ts-node -r tsconfig-paths/register src/db/seed.ts

echo "Starting backend..."
node dist/server.js
