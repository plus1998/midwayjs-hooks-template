import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'User',
    timestamps: true,
  },
})
export class User {
  // 仅为类声明
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  @prop({ type: String, required: true, unique: true })
  public username: string;

  @prop({ type: String, required: true })
  public password: string;

  @prop({ type: () => String, default: 'user', index: 1 })
  public role: string;

  // 当需要用户重新登录的时候 修改这个字段
  @prop({ type: () => String, required: true })
  public jwtSecret: string;

  // 用户信息 创建两个信息表 amdinProfile userProfile 关联的时候根据role查询
  // @prop({ type: () => String, required: true })
  // profileId: string;
}
