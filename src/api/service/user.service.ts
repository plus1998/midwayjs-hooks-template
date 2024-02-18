import { Provide, Inject, Config } from '@midwayjs/core';
import { User } from '../entity/user';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import crypto from 'crypto';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @Inject()
  jwtService: JwtService;

  @Config('jwt.refreshToken')
  refreshJwtConfig;

  @Inject()
  logger;

  async login(username: string, password: string) {
    const ret = await this.userModel.findOne({
      username,
      password,
    })
    if (!ret) return { success: false, message: '账号或密码错误', data: {} }
    // 生成token
    const token = this.jwtService.signSync({ _id: ret._id, role: ret.role })
    // 生成refreshToken
    const refreshToken = this.jwtService.signSync({ _id: ret._id }, ret.password, this.refreshJwtConfig);
    return {
      success: true,
      message: '登入成功',
      data: {
        token,
        refreshToken,
      }
    };
  }

  async refreshToken(refreshToken: string) {
    // 从token中获取用户信息 未经过校验的
    const [, payload_str] = refreshToken.split('.');
    const payload = JSON.parse(Buffer.from(payload_str, 'base64').toString());
    const uid = payload._id;
    // 这里的uid是未经过校验签名的， 但是如果refreshToken能验证成功，说明uid没问题
    const user = await this.userModel.findById(uid);
    try {
      const ret = this.jwtService.verifySync(refreshToken, user.password, this.refreshJwtConfig);
      if (ret['_id'] !== uid) return { success: false, message: 'refreshToken不正确' }
    } catch (error) {
      return { success: false, message: 'refreshToken已过期' }
    }
    const token = this.jwtService.signSync({ _id: user._id, role: user.role })
    return { success: true, data: { token }, message: '刷新成功' };
  }

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
