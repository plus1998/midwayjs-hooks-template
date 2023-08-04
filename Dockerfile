FROM node:16.9.0-alpine

RUN apk update

# 设置东8区
RUN apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

# 安装git
RUN apk add git

WORKDIR /app

# 克隆代码
RUN git clone https://github.com/plusl894860970/midwayjs-hooks-template.git . 

# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org

# 构建
RUN npm run build

CMD ["npm", "run", "start"]