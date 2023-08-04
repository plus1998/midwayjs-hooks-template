# Midway.js 一体化项目模板

* Typegoose+MongoDB
* 单元测试
* JWT中间件鉴权
* TailwindCSS
* 登录界面+主页
* 前端请求拦截器
* 跨域CORS
* Docker部署

# 开发

```shell
npm i
```
```shell
npm run dev
```

# 部署

```shell
npm build
```

```shell
npm run start
```

# Docker

```shell
docker build -t app .
```

```shell
docker run -itd --name appname --restart=always -p 3000:3000 app
```