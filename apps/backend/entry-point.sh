#!/bin/sh
set -e



echo "Running Prisma migrations..."
pnpm --filter pinterest-clone-backend exec prisma migrate deploy --schema ./prisma/schema.prisma


echo "Starting backend..."
node dist/server.js
