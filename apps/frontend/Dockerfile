# ---------- Build Stage ----------
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable

# Copy root + frontend package info
COPY package.json pnpm-workspace.yaml*   ./
COPY apps/frontend/package.json apps/frontend/

# Install only frontend deps
RUN pnpm install --filter frontend 

# Copy frontend source
COPY apps/frontend ./apps/frontend
 
# Pass build args (API URL)
ARG VITE_BACKEND_API_URL
ENV VITE_BACKEND_API_URL=${VITE_BACKEND_API_URL}

# Build frontend
# RUN pnpm --filter frontend build

RUN pnpm --filter frontend build && ls -la /app/apps/frontend

# ---------- Runtime Stage ----------
FROM nginx:1.29.1-alpine

RUN rm -rf /usr/share/nginx/html/*

# Copy build output into nginx
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html

COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
