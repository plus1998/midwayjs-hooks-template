import { Provide, Inject } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';
import * as bullmq from '@midwayjs/bullmq';
import { Queue } from '../enum/queue.enum';

@Provide()
export class DemoService {
  // redis使用
  @Inject()
  redisService: RedisService;

  // 队列使用
  @Inject()
  bullmqFramework: bullmq.Framework;

  async redis_demo() {
    return this.redisService.set('hooks_demo', 'hello', 'EX', 10);
  }

  async queue_demo() {
    const queue = this.bullmqFramework.getQueue(Queue.demo);
    await queue.addJobToQueue(
      {
        t: Date.now(),
      },
      {
        delay: 1000,
      },
    );
  }
}
