export default {
  keys: 'hooks_demo-prod',
  redis: {
    client: {
      port: 6379,
      host: '172.17.0.1',
      password: '@Super123456',
      db: 0,
    },
  },
  bullmq: {
    defaultConnection: {
      host: '172.17.0.1',
      port: 6379,
      password: '@Super123456',
      db: 1,
    },
    defaultPrefix: '{midway-bullmq}',
  },
  // 生产环境可以使用随机字符串增加安全性
  bullBoard: {
    basePath: '/queue',
  },
  mongoose: {
    dataSource: {
      default: {
        uri: 'mongodb://172.17.0.1/hooks_demo',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user: 'root',
          pass: 'Super123456',
          authSource: 'admin',
        },
        // 关联实体
        entities: ['/entity'],
      },
    },
  },
};
