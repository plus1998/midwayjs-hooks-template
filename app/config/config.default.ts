import { loggers } from '@midwayjs/logger';

export default {
  loggerFactory: loggers,
  koa: {
    port: 3000,
  },
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
    expiresIn: '1h',
  },
  jwtExtend: {
    // 双token
    refreshTokenConfig: {
      expiresIn: '90d',
    },
    // 单点登录
    singleSignOn: true,
  },
};
