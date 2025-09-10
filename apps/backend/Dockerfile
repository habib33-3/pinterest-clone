# ---------- Base Builder ----------
FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

# Copy monorepo manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/backend/package.json apps/backend/

# Install dependencies (frozen lockfile for reproducibility)
RUN pnpm install --frozen-lockfile

# Copy full repo for turbo prune/build
COPY . .

# Generate a pruned workspace for backend
RUN pnpm turbo prune pinterest-clone-backend --docker


# ---------- Pruned Builder ----------
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app

# Copy pruned workspace
COPY --from=base /app/out/json/ ./
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install only pruned deps
RUN pnpm install --frozen-lockfile

# Copy pruned source
COPY --from=base /app/out/full/ ./

# Build backend + generate Prisma client
RUN pnpm turbo run build --filter=...pinterest-clone-backend
RUN pnpm --filter=pinterest-clone-backend prisma generate


# ---------- Runtime ----------
FROM node:22-alpine AS runtime
RUN corepack enable
WORKDIR /app

# Copy lockfile + manifest (from pruned build)
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /app/apps/backend/package.json ./package.json

# Copy backend dist + prisma
COPY --from=build /app/apps/backend/dist ./dist
COPY --from=build /app/apps/backend/prisma ./prisma

# Install production-only deps
RUN pnpm install --prod --ignore-scripts --prefer-offline

RUN pnpm prisma generate

# Entrypoint (migrations + start)
COPY apps/backend/entry-point.sh ./entry-point.sh
RUN chmod +x ./entry-point.sh

EXPOSE 5000 5555
CMD ["./entry-point.sh"]
