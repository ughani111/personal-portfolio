FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/core/package.json packages/core/package.json
COPY packages/storage/package.json packages/storage/package.json
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build -w @open-stack/core \
  && npm run build -w @open-stack/storage \
  && npm run build -w @open-stack/api

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/core/package.json packages/core/package.json
COPY packages/storage/package.json packages/storage/package.json
RUN npm ci --omit=dev
COPY --from=build /app/apps/api/dist apps/api/dist
COPY --from=build /app/packages/core/dist packages/core/dist
COPY --from=build /app/packages/storage/dist packages/storage/dist
EXPOSE 3001
CMD ["npm", "run", "start", "-w", "@open-stack/api"]
