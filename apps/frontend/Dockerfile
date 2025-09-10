# ---------- Base Builder ----------
FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

# Copy root manifests first (better caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/frontend/package.json apps/frontend/

# Install only what's needed for pruning
RUN pnpm install --frozen-lockfile

# Copy the rest of the monorepo
COPY . .

# Prune workspace to only include frontend & its deps
# RUN pnpm turbo prune --filter=pinterest-clone-frontend --docker

RUN pnpm turbo prune pinterest-clone-frontend --docker


# ---------- Pruned Builder ----------
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app

# Copy pruned files from base stage
COPY --from=base /app/out/json/ ./
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install only required dependencies
RUN pnpm install --frozen-lockfile

# Copy pruned source code
COPY --from=base /app/out/full/ ./

# Pass API URL from build args
ARG VITE_BACKEND_API_URL
ENV VITE_BACKEND_API_URL=${VITE_BACKEND_API_URL}

# Build frontend
RUN pnpm turbo run build --filter=pinterest-clone-frontend


# ---------- Runtime ----------
FROM nginx:1.29.1-alpine

# Clean default nginx html folder
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend into nginx
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html

# Copy custom nginx config
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
