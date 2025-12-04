# --- 第一阶段：构建阶段 ---
FROM node:18-alpine as build-stage

WORKDIR /app

# 1. 复制 package 文件
COPY package*.json ./

# 【新增这一行】手动安装 pnpm
RUN npm install -g pnpm

RUN pnpm config set registry https://registry.npmmirror.com

RUN pnpm config set fetch-timeout 600000

# 2. 现在可以使用 pnpm 安装依赖了
RUN pnpm install

COPY . .

# 3. 清理旧的构建文件并执行构建
RUN echo "=== Cleaning dist folder ===" && \
    rm -rf dist && \
    echo "=== Running build process ===" && \
    pnpm run build && \
    echo "=== Build completed, checking dist contents ===" && \
    ls -la dist/ && \
    echo "=== Dist folder size ===" && \
    du -sh dist/

# --- 第二阶段保持不变 ---
FROM nginx:stable-alpine as production-stage

# 添加调试信息
RUN echo "=== Starting production stage ==="

# 清理 nginx html 目录
RUN echo "=== Cleaning nginx html directory ===" && \
    rm -rf /usr/share/nginx/html/* && \
    ls -la /usr/share/nginx/html/

# 复制构建文件
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 添加调试信息检查复制后的文件
RUN echo "=== Checking copied files ===" && \
    ls -la /usr/share/nginx/html/ && \
    echo "=== HTML directory size ===" && \
    du -sh /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]