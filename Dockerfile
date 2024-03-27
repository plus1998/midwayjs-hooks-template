FROM node:18.18.0-alpine

# 设置国内源
# RUN set -eux && sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories

RUN apk update

# 设置东8区
RUN apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

# 复制package.json
COPY ./package.json /app/package.json

# 安装nrm
# RUN npm --registry=https://registry.npm.taobao.org install nrm -g --verbose
# 切换镜像源
# RUN nrm use taobao

# 安装依赖
WORKDIR /app
RUN npm install --verbose

# --- 以上为缓存 ---

# 复制项目文件
COPY . /app

# 构建
RUN npm run build

EXPOSE 7001

ENTRYPOINT ["npm", "run", "start"]