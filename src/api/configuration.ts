import { createConfiguration, hooks } from '@midwayjs/hooks';
import * as Koa from '@midwayjs/koa';
import * as typegoose from '@midwayjs/typegoose';
import { join } from 'path';
import cors from '@koa/cors';
import * as jwt from '@midwayjs/jwt';
// middleware
import { JwtMiddleware } from './middleware/jwt';

/**
 * setup midway server
 */
export default createConfiguration({
  imports: [
    Koa,
    typegoose,
    jwt,
    hooks({
      middleware: [cors({ origin: '*' }), JwtMiddleware],
    })
  ],
  importConfigs: [
    join(__dirname, './config')
  ]
});
