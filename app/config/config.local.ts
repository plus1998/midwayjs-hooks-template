export default {
  keys: 'hooks_demo-local',
  redis: {
    client: {
      port: 6379, // Redis port
      host: 'localhost', // Redis host
      password: 'Super123456',
      db: 0,
    },
  },
  bullmq: {
    defaultConnection: {
      host: 'localhost',
      port: 6379,
      password: 'Super123456',
      db: 1,
    },
    defaultPrefix: '{midway-bullmq}',
  },
  bullBoard: {
    basePath: '/queue',
  },
  mongoose: {
    dataSource: {
      default: {
        uri: 'mongodb://localhost/hooks_demo',
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
