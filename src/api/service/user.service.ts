import { Provide, Inject } from '@midwayjs/core';
import { User } from '../entity/user';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import crypto from 'crypto';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @Inject()
  logger;

  async createUser(username: string, password: string, role = 'user') {
    return await this.userModel.create({
      username,
      password: crypto.createHash('md5').update(password).digest('hex'),
      role,
    });
  }

  async changePassword(uid: string, oldPass: string, newPass: string) {
    const user = await this.userModel.findById(uid);
    oldPass = crypto.createHash('md5').update(oldPass).digest('hex');
    if (user.password !== oldPass) {
      return { success: false, message: '密码错误' }
    }
    user.password = crypto.createHash('md5').update(newPass).digest('hex');
    await user.save();
    return { success: true, message: '修改成功' };
  }

  async initAdmin() {
    // 注册管理员
    const admin = await this.userModel.findOne({
      username: 'admin',
      role: 'admin',
    });
    if (admin) {
      this.logger.warn('管理员已注册');
      return
    }
    try {
      await this.createUser('admin', 'public', 'admin');
      this.logger.warn('管理员注册成功');
    } catch (error) {
      this.logger.error('admin注册失败', error);
    }
  }
}
