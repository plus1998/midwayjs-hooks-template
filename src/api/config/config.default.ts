import { loggers } from '@midwayjs/logger';

export default {
  loggerFactory: loggers,
  midwayLogger: {
    default: {
      level: 'info',
      // 使用pm2启动可以console开启，file关闭
      transports: {
        file: false,
        console: {
          level: 'info',
        },
      },
    },
  },
  jwt: {
    secret: 'hooks_demo-common',
    expiresIn: '6h',
    refreshToken: {
      expiresIn: '90d',
    },
  },
};
