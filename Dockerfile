############################################################
#                   Stage 1: Base                          #
############################################################
FROM oven/bun:1.1.40 AS base

# Meta
LABEL org.opencontainers.image.source="https://github.com/jhjcpishva/llms-micro-blog-web"

# Copy the lock and package file
COPY package.json .
COPY bun.lockb .
RUN bun install --frozen-lockfile

COPY . .

ARG VITE_PB_URL="/pb/"
ENV VITE_PB_URL=$VITE_PB_URL
ARG VITE_LLMS_URL="/llms/"
ENV VITE_LLMS_URL=$VITE_LLMS_URL


############################################################
#                   Stage 2: Develop                       #
############################################################
FROM base AS develop
CMD ["bun", "run", "dev"]


############################################################
#                   Stage 3: Builder                       #
############################################################
FROM base AS builder
RUN bun run build-only


############################################################
#                   Stage 4: Serve                         #
############################################################
FROM nginx:latest

COPY nginx_default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/bun/app/dist /usr/share/nginx/html/app

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
