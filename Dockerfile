FROM node:16.9.0-alpine

RUN apk update

# 设置东8区
RUN apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

# 复制项目文件
COPY ./src /app/src
COPY ./public /app/public
COPY ./*.ts /app/
COPY ./*.js /app/
COPY ./*.json /app/
COPY ./*.html /app/
COPY ./*.css /app/

WORKDIR /app

# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org

# 构建
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]