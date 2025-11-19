# syntax=docker/dockerfile:1

FROM node:20-bookworm AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-bookworm AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM nginx:stable-alpine AS runner
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

