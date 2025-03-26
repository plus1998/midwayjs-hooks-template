import { Inject, Middleware, httpError } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;
  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          const ret = await this.jwtService.verify(token, {
            complete: true,
          });
          ctx.user = ret['payload'];
        } catch (error) {
          ctx.status = 401;
          return;
        }
        await next();
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const ignore =
      ctx.path === '/' ||
      ctx.path.startsWith('/assets/') ||
      ctx.path === '/User/Register' ||
      ctx.path === '/User/Login' ||
      ctx.path === '/User/RefreshToken' ||
      ctx.path.startsWith('/ui') ||
      ctx.path.startsWith('/favicon.ico');
    return !ignore;
  }
}
