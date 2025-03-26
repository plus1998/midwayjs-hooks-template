export default {
  keys: 'hooks_demo-local',
  redis: {
    client: {
      port: 6379, // Redis port
      host: 'localhost', // Redis host
      password: '@Super123456',
      db: 0,
    },
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
