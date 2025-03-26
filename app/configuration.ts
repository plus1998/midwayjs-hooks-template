import { Configuration, ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { hooks } from '@midwayjs/hooks';
import * as Koa from '@midwayjs/koa';
import * as typegoose from '@midwayjs/typegoose';
import { join } from 'path';
import cors from '@koa/cors';
import * as jwt from '@midwayjs/jwt';
// middleware
import { JwtMiddleware } from './middleware/jwt';
import { UserService } from './service/user.service';
import * as redis from '@midwayjs/redis';

/**
 * setup midway server
 */
@Configuration({
  imports: [
    Koa,
    redis,
    typegoose,
    jwt,
    hooks({
      middleware: [cors({ origin: '*' }), JwtMiddleware],
    }),
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  async onServerReady(container: IMidwayContainer) {
    const userService = await container.getAsync(UserService);
    await userService.initAdmin();
  }
}
