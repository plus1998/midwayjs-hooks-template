import { Context } from '@midwayjs/koa';
import { useContext } from '@midwayjs/hooks';

const isAdmin = async (next: any) => {
  const ctx = useContext<Context>();

  if (ctx.user && ctx.user.role === 'admin') {
    await next();
  } else {
    ctx.status = 401;
    return
  }
};

export { isAdmin }