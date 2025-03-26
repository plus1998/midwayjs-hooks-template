import { Processor, IProcessor } from '@midwayjs/bullmq';
import { FORMAT, Inject } from '@midwayjs/core';
import { MidwayLogger } from '@midwayjs/logger';

@Processor('demo', {
  repeat: {
    pattern: FORMAT.CRONTAB.EVERY_PER_5_SECOND,
  },
})
export class DemoScheduleProcessor implements IProcessor {
  @Inject()
  logger: MidwayLogger;

  async execute() {
    // 每 5 秒执行一次
    this.logger.info('demo schedule every 5 second');
  }
}
