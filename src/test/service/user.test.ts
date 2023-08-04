import { UserService } from '../../api/service/user.service';
import { createApp, close } from '@midwayjs/mock';
import { join } from 'path';

import * as Koa from '@midwayjs/koa';

describe('test/service/user.service.ts', () => {
  test('UserService.Example', async () => {
    const backendDir = join(__dirname, '../../api')
    const config = {
      baseDir: backendDir,
      importConfigs: [join(__dirname, '../../api/config')],
    };
    // create app
    const app = await createApp<Koa.Framework>(backendDir, config);
    // 根据依赖注入 class 获取实例（推荐）
    const userService = await app.getApplicationContext().getAsync<UserService>(UserService);
    await userService.userModel.create({
      username: 'admin',
      password: '4c9184f37cff01bcdc32dc486ec36961', // public
      role: 'admin'
    });
    // close app
    await close(app);
  }, 60 * 1000);

});