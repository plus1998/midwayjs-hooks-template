import * as Koa from '@midwayjs/koa';
import { UserService } from '../../service/user.service';
import { createApp, close } from '@midwayjs/mock';
import { getProjectRoot } from '@midwayjs/hooks-internal'
import { join } from 'path';
import assert from 'assert';

const root = join(getProjectRoot(), 'app')
const config = {
  baseDir: root,
  importConfigs: [join(root, 'config')],
};

describe('test/service/user.service.ts', () => {
  test('UserService.Example', async () => {
    // create app
    const app = await createApp<Koa.Framework>(root, config);
    // 根据依赖注入 class 获取实例（推荐）
    const userService = await app.getApplicationContext().getAsync<UserService>(UserService);
    const ret = await userService.userModel.findOne({
      username: 'admin',
    });
    assert(ret);
    assert.equal(ret.role, 'admin');
    // close app
    await close(app);
  }, 60 * 1000);

});