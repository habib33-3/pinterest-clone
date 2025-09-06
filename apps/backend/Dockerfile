# ---------- Build Stage ----------
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app

# Copy root manifests
COPY package.json pnpm-workspace.yaml turbo.json ./

# Copy backend manifest
COPY apps/backend/package.json ./apps/backend/

# Install dependencies
RUN pnpm install

# Copy backend source and Prisma schema
COPY apps/backend/prisma ./apps/backend/prisma/
COPY apps/backend/src ./apps/backend/src/
COPY apps/backend/tsconfig.json ./apps/backend/

# Generate Prisma client (no db push at build time)
RUN pnpm --filter pinterest-clone-backend prisma generate

# Build backend
RUN pnpm build --filter pinterest-clone-backend

# ---------- Runtime Stage ----------
FROM node:22-alpine AS runtime
RUN corepack enable
WORKDIR /app

# Copy compiled backend
COPY --from=build /app/apps/backend/dist ./dist
COPY --from=build /app/apps/backend/src/generated/prisma ./src/generated/prisma

# COPY Prisma schema INTO apps/backend so Prisma can find it
COPY --from=build /app/apps/backend/prisma ./apps/backend/prisma

# Copy root manifests
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/backend/package.json ./apps/backend/

# Install production dependencies only
RUN pnpm install --filter pinterest-clone-backend --prod --ignore-scripts --shamefully-hoist

# Expose ports
EXPOSE 5000 5555

# Copy entry-point script
COPY apps/backend/entry-point.sh ./entry-point.sh
RUN chmod +x ./entry-point.sh

# Start backend
CMD ["./entry-point.sh"]
