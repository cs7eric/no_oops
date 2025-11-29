# --- 第一阶段：构建阶段 ---
FROM node:18-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 先复制 package.json 缓存依赖安装
COPY package*.json ./
# 安装依赖 (使用 pnpm ci 比 install 更适合 CI 环境)
RUN pnpm install

# 复制所有源代码
COPY . .

# 执行 Vite 构建 (生成 dist 目录)
RUN pnpm run build

# --- 第二阶段：生产环境阶段 ---
FROM nginx:stable-alpine as production-stage

# 复制第一阶段编译好的 dist 目录到 Nginx 默认目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]