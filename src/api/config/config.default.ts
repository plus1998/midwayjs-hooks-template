import { loggers } from '@midwayjs/logger';

export default {
  loggerFactory: loggers,
  midwayLogger: {
    default: {
      level: 'info',
      // 一般来说服务器是不输出日志到控制台的
      transports: {
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
