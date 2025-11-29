# Multi-stage build
FROM node:16-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml .npmrc ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm fetch
RUN pnpm install -r --offline

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]