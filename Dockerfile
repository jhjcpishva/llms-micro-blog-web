FROM oven/bun:1.1.40

# Copy the lock and package file
COPY package.json .
COPY bun.lockb .
RUN bun install --frozen-lockfile

COPY . .

ARG VITE_PB_URL="/pb/"
ENV VITE_PB_URL=$VITE_PB_URL

RUN bun run build-only

EXPOSE 4173
CMD ["bun", "preview", "--open=0"]
