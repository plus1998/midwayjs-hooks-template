import { Provide } from '@midwayjs/core';
import { User } from '../entity/user';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';


@Provide()
export class UserService{

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;
}
