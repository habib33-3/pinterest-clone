

# ---------- Base Builder ----------
FROM node:22-alpine AS base

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser

RUN corepack enable
WORKDIR /app
RUN chown nodeuser:nodejs /app

# Copy root manifests
COPY --chown=nodeuser:nodejs package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY --chown=nodeuser:nodejs apps/backend/package.json apps/backend/

RUN --mount=type=cache,target=/home/nodeuser/.local/share/pnpm,uid=1001,gid=1001 \
    pnpm install --frozen-lockfile

COPY --chown=nodeuser:nodejs . .

# ARG to define which app to prune
ARG BUILD_APP
RUN pnpm turbo prune ${BUILD_APP} --docker


# ---------- Builder ----------
FROM node:22-alpine AS builder

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser
RUN corepack enable
WORKDIR /app

COPY --from=base --chown=nodeuser:nodejs /app/out/json/ ./
COPY --from=base --chown=nodeuser:nodejs /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,target=/root/.local/share/pnpm \
    pnpm install --frozen-lockfile

COPY --from=base --chown=nodeuser:nodejs /app/out/full/ ./
RUN chown -R nodeuser:nodejs /app

ARG BUILD_APP
USER nodeuser
RUN pnpm turbo run build --filter=${BUILD_APP} && \
    pnpm --filter=${BUILD_APP} prisma generate

USER root
RUN pnpm deploy --filter=${BUILD_APP} --prod /app/prod
RUN chown -R nodeuser:nodejs /app/prod
USER nodeuser


# ---------- Runtime ----------
FROM node:22-alpine AS runtime

RUN apk add --no-cache dumb-init
RUN corepack enable
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser

WORKDIR /app
RUN chown nodeuser:nodejs /app

COPY --from=builder --chown=nodeuser:nodejs /app/prod/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodejs /app/apps/backend/dist ./dist
COPY --from=builder --chown=nodeuser:nodejs /app/apps/backend/prisma ./prisma
COPY --from=builder --chown=nodeuser:nodejs /app/apps/backend/package.json ./package.json

COPY --chown=nodeuser:nodejs apps/backend/scripts/docker-run.sh ./docker-run.sh
RUN chmod +x ./docker-run.sh

USER nodeuser
EXPOSE 5000 5555
ENTRYPOINT ["dumb-init", "--"]
CMD ["./docker-run.sh"]
