# ---------- Base Builder ----------
FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/frontend/package.json apps/frontend/
RUN pnpm install --frozen-lockfile
COPY . .

# ARG for target app
ARG BUILD_APP
RUN pnpm turbo prune ${BUILD_APP} --docker


# ---------- Pruned Builder ----------
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app

COPY --from=base /app/out/json/ ./
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=base /app/out/full/ ./

ARG BUILD_APP
ARG VITE_BACKEND_API_URL
ENV VITE_BACKEND_API_URL=${VITE_BACKEND_API_URL}

RUN pnpm turbo run build --filter=${BUILD_APP}


# ---------- Runtime ----------
FROM nginx:1.29.1-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
