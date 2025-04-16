# 构建阶段
FROM node:16 AS builder

# 安装 pnpm 并配置缓存
RUN npm install -g pnpm
ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"
RUN pnpm config set store-dir /pnpm/.pnpm-store

WORKDIR /app
# 先复制依赖文件以利用 Docker 缓存
COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch && pnpm install -r --offline

# 复制源码并构建
COPY . .
RUN pnpm run build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]