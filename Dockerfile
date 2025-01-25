FROM oven/bun:1.1.40 AS builder

# Copy the lock and package file
COPY package.json .
COPY bun.lockb .
RUN bun install --frozen-lockfile

COPY . .

ARG VITE_PB_URL="/pb/"
ENV VITE_PB_URL=$VITE_PB_URL

RUN bun run build-only

# Nginx Stage
FROM nginx:latest

COPY nginx_default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /home/bun/app/dist /usr/share/nginx/html/app


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]