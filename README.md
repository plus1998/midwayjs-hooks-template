# Midway.js 一体化项目模板

NodeJS 20

# 介绍
* Typegoose+MongoDB
* Redis
* 消息队列（BULL）
* 分布式定时任务
* 单元测试
* JWT中间件鉴权
* TailwindCSS
* 登录界面+主页
* 前端请求拦截器
* 跨域CORS
* PM2部署
* Docker部署

# 开发

```shell
npm i
```
```shell
npm run dev
```

# 构建

```shell
npm build
```

# 启动
```shell
npm run start
```
or
```
node bootstrap.js
```

# PM2部署
```shell
# 启动
pm2 start
# 保存
pm2 save
# 开机启动
pm2 startup
```

# Docker部署

```shell
docker-compose build

docker-compose up
```