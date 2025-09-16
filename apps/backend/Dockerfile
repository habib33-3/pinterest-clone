# ---------- Base Builder ----------
FROM node:22-alpine AS base

# Security: Create non-root user early
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser

# Performance: Enable corepack and set working directory
RUN corepack enable
WORKDIR /app

# Security: Change ownership to non-root user
RUN chown nodeuser:nodejs /app

# Performance: Copy dependency files first for better layer caching
COPY --chown=nodeuser:nodejs package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY --chown=nodeuser:nodejs apps/backend/package.json apps/backend/

# Performance: Install dependencies with cache optimization
RUN --mount=type=cache,target=/root/.local/share/pnpm,uid=1001,gid=1001 \
    pnpm install --frozen-lockfile

# Copy source code
COPY --chown=nodeuser:nodejs . .

# Generate pruned workspace
RUN pnpm turbo prune pinterest-clone-backend --docker

# ---------- Builder ----------
FROM node:22-alpine AS builder

# Security: Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser

RUN corepack enable
WORKDIR /app

# Security: Change ownership
RUN chown nodeuser:nodejs /app
USER nodeuser

# Performance: Copy pruned workspace with proper ownership
COPY --from=base --chown=nodeuser:nodejs /app/out/json/ ./
COPY --from=base --chown=nodeuser:nodejs /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Performance: Install with cache mount
RUN --mount=type=cache,target=/home/nodeuser/.local/share/pnpm,uid=1001,gid=1001 \
    pnpm install --frozen-lockfile

# Copy source and build
COPY --from=base --chown=nodeuser:nodejs /app/out/full/ ./

# Performance: Build with cache for node_modules
RUN --mount=type=cache,target=/home/nodeuser/.local/share/pnpm,uid=1001,gid=1001 \
    pnpm turbo run build --filter=...pinterest-clone-backend && \
    pnpm --filter=pinterest-clone-backend prisma generate

# ---------- Runtime ----------
FROM node:22-alpine AS runtime

# Security: Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Performance: Enable corepack before creating user
RUN corepack enable

# Security: Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser

WORKDIR /app

# Security: Change ownership
RUN chown nodeuser:nodejs /app

# Performance: Copy only necessary files with proper ownership
COPY --from=builder --chown=nodeuser:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=nodeuser:nodejs /app/apps/backend/package.json ./package.json
COPY --from=builder --chown=nodeuser:nodejs /app/apps/backend/dist ./dist
COPY --from=builder --chown=nodeuser:nodejs /app/apps/backend/prisma ./prisma

# Performance: Install production deps with cache (as root for pnpm access)
RUN --mount=type=cache,target=/root/.local/share/pnpm \
    pnpm install --prod --ignore-scripts --prefer-offline && \
    pnpm prisma generate

# Security: Copy and set permissions for startup script
COPY --chown=nodeuser:nodejs apps/backend/scripts/docker-run.sh ./docker-run.sh
RUN chmod +x ./docker-run.sh

# Security: Switch to non-root user
USER nodeuser

# Performance: Use specific port binding
EXPOSE 5000 5555

# Security: Use dumb-init as PID 1 and run as non-root
ENTRYPOINT ["dumb-init", "--"]
CMD ["./docker-run.sh"]