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
