import { Inject, Provide } from '@midwayjs/core';
import axios from 'axios';
import { UserService } from './user.service';

// 消息类型枚举
export enum MessageType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
}

// 平台类型
export enum PlatformType {
  FEISHU = 'feishu',
  QIWEI = 'qiwei',
  DINGTALK = 'dingtalk',
}

@Provide()
export class NotifyService {
  @Inject()
  logger;

  @Inject()
  userService: UserService;

  /**
   * 识别webhook平台类型
   */
  private getPlatformType(webhook: string): PlatformType | null {
    if (webhook.includes('open.feishu.cn')) {
      return PlatformType.FEISHU;
    } else if (webhook.includes('qyapi.weixin.qq.com')) {
      return PlatformType.QIWEI;
    } else if (webhook.includes('oapi.dingtalk.com')) {
      return PlatformType.DINGTALK;
    }
    return null;
  }

  /**
   * 构建飞书卡片消息
   */
  private buildFeishuCard(title: string, content: string, type: MessageType) {
    const colorMap = {
      [MessageType.ERROR]: 'red',
      [MessageType.SUCCESS]: 'green',
      [MessageType.INFO]: 'blue',
    };

    const iconMap = {
      [MessageType.ERROR]: '❌',
      [MessageType.SUCCESS]: '✅',
      [MessageType.INFO]: 'ℹ️',
    };

    const headerTitleMap = {
      [MessageType.ERROR]: '异常通知',
      [MessageType.SUCCESS]: '成功通知',
      [MessageType.INFO]: '信息通知',
    };

    return {
      config: {
        wide_screen_mode: true,
      },
      elements: [
        {
          tag: 'div',
          text: {
            content: `${iconMap[type]} **${title}**\n\n${content}`,
            tag: 'lark_md',
          },
        },
        {
          tag: 'hr',
        },
        {
          tag: 'div',
          text: {
            content: `<font color="grey">发送时间: ${new Date().toLocaleString(
              'zh-CN',
            )}</font>`,
            tag: 'lark_md',
          },
        },
      ],
      header: {
        template: colorMap[type],
        title: {
          content: headerTitleMap[type],
          tag: 'plain_text',
        },
      },
    };
  }

  /**
   * 发送飞书卡片消息
   */
  private async sendFeishuCard(webhook: string, card: any) {
    const { data } = await axios.post(webhook, {
      msg_type: 'interactive',
      card,
    });
    if (data.code !== 0) {
      this.logger.error('飞书webhook发送失败', data);
      throw new Error(`飞书消息发送失败: ${data.msg}`);
    }
    return data;
  }

  /**
   * 发送企微文本消息
   */
  private async sendQiweiText(
    webhook: string,
    title: string,
    content: string,
    type: MessageType,
  ) {
    const iconMap = {
      [MessageType.ERROR]: '❌',
      [MessageType.SUCCESS]: '✅',
      [MessageType.INFO]: 'ℹ️',
    };

    const typeNameMap = {
      [MessageType.ERROR]: '异常通知',
      [MessageType.SUCCESS]: '成功通知',
      [MessageType.INFO]: '信息通知',
    };

    const message = `${iconMap[type]} ${
      typeNameMap[type]
    }\n\n📋 ${title}\n\n📝 ${content}\n\n🕒 ${new Date().toLocaleString(
      'zh-CN',
    )}`;

    const { data } = await axios.post(webhook, {
      msgtype: 'text',
      text: {
        content: message,
      },
    });
    if (data?.errcode !== 0) {
      this.logger.error('企微webhook发送失败', data);
      throw new Error(`企微消息发送失败: ${data.errmsg}`);
    }
    return data;
  }

  /**
   * 发送钉钉markdown消息
   */
  private async sendDingtalkMarkdown(
    webhook: string,
    title: string,
    content: string,
    type: MessageType,
  ) {
    const iconMap = {
      [MessageType.ERROR]: '❌',
      [MessageType.SUCCESS]: '✅',
      [MessageType.INFO]: 'ℹ️',
    };

    const typeNameMap = {
      [MessageType.ERROR]: '异常通知',
      [MessageType.SUCCESS]: '成功通知',
      [MessageType.INFO]: '信息通知',
    };

    const markdownContent = `## ${iconMap[type]} ${typeNameMap[type]}

### 📋 ${title}

${content}

---
**发送时间:** ${new Date().toLocaleString('zh-CN')}`;

    const { data } = await axios.post(webhook, {
      msgtype: 'markdown',
      markdown: {
        title: `${typeNameMap[type]}: ${title}`,
        text: markdownContent,
      },
    });

    if (data?.errcode !== 0) {
      this.logger.error('钉钉webhook发送失败', data);
      throw new Error(`钉钉消息发送失败: ${data.errmsg}`);
    }
    return data;
  }

  /**
   * 通用消息发送方法
   */
  async sendNotification(
    webhook: string,
    title: string,
    content: string,
    type: MessageType = MessageType.INFO,
  ) {
    if (!webhook) {
      this.logger.info(`${type}通知(未配置webhook)`, title, content);
      return;
    }

    const platformType = this.getPlatformType(webhook);
    if (!platformType) {
      this.logger.error('不支持的webhook平台', webhook);
      throw new Error('不支持的webhook平台');
    }

    try {
      switch (platformType) {
        case PlatformType.FEISHU: {
          const card = this.buildFeishuCard(title, content, type);
          return await this.sendFeishuCard(webhook, card);
        }

        case PlatformType.QIWEI: {
          return await this.sendQiweiText(webhook, title, content, type);
        }

        case PlatformType.DINGTALK: {
          return await this.sendDingtalkMarkdown(webhook, title, content, type);
        }

        default:
          throw new Error(`不支持的平台类型: ${platformType}`);
      }
    } catch (error) {
      this.logger.error('发送通知失败', error);
      throw error;
    }
  }

  /**
   * 发送错误通知
   */
  async sendErrorNotify(webhook: string, title: string, content: string) {
    return this.sendNotification(webhook, title, content, MessageType.ERROR);
  }

  /**
   * 发送成功通知
   */
  async sendSuccessNotify(webhook: string, title: string, content: string) {
    return this.sendNotification(webhook, title, content, MessageType.SUCCESS);
  }

  /**
   * 发送信息通知
   */
  async sendInfoNotify(webhook: string, title: string, content: string) {
    return this.sendNotification(webhook, title, content, MessageType.INFO);
  }

  // 保留旧方法以保持兼容性
  async feishubuildErrorCard(title: string, content: string) {
    return this.buildFeishuCard(title, content, MessageType.ERROR);
  }

  async feishuSendCard(webhook: string, card: any) {
    return this.sendFeishuCard(webhook, card);
  }

  async qiweiSendText(webhook: string, title: string, content: string) {
    return this.sendQiweiText(webhook, title, content, MessageType.ERROR);
  }
}
