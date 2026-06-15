# Build the app to static files
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve the static build on the assigned port, with runtime API_URL injection
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve@14
COPY --from=build /app/dist ./dist
COPY entrypoint.sh ./entrypoint.sh
# config.js is rewritten at startup as the non-root runtime user, so it must be
# writable; entrypoint must be executable.
RUN chmod 666 /app/dist/config.js && chmod +x /app/entrypoint.sh
# Shell form so $PORT / $API_URL expand at runtime
CMD ./entrypoint.sh
