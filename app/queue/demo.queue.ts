import { Processor, IProcessor } from '@midwayjs/bullmq';
import { Queue } from '../enum/queue.enum';

@Processor(Queue.demo)
export class DemoQueueProcessor implements IProcessor {
  async execute(data: any) {
    // 处理任务逻辑
    console.log('execute queue job:', data);
  }
}
