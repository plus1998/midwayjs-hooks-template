FROM node:16.9.0-alpine

RUN apk update

# 设置东8区
RUN apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

# 复制package.json
COPY ./package.json /app/package.json

# 安装依赖
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org

# --- 以上为缓存，以下为构建 ---

# 复制项目文件
COPY . /app

# 构建
RUN npm run build

EXPOSE 7001

ENTRYPOINT ["npm", "run", "start"]