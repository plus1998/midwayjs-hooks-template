import { Provide, Inject } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class DemoService {
  @Inject()
  redisService: RedisService;

  async redis_demo() {
    return this.redisService.set('hooks_demo', 'hello', 'EX', 10);
  }
}
