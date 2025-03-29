import { Processor, IProcessor, Framework } from '@midwayjs/bullmq';
import { FORMAT, Inject } from '@midwayjs/core';
import { MidwayLogger } from '@midwayjs/logger';
import { Queue } from '../enum/queue.enum';

@Processor('demo.schedule', {
  repeat: {
    pattern: FORMAT.CRONTAB.EVERY_PER_5_SECOND,
  },
})
export class DemoScheduleProcessor implements IProcessor {
  @Inject()
  logger: MidwayLogger;

  @Inject()
  bullMqFramework: Framework;

  async execute() {
    // 每 5 秒执行一次
    this.logger.info('demo schedule every 5 second');
    // 延迟任务 手动推送
    const queue = this.bullMqFramework.getQueue(Queue.demo);
    queue?.addJobToQueue(
      {
        name: 'demo',
      },
      {
        delay: 1000,
      },
    );
  }
}
