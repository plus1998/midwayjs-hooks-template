import { Context } from '@midwayjs/koa';
import { UserService } from './service/user.service';
import { Api, Post, useInject, useContext } from '@midwayjs/hooks';
import { JwtService } from '@midwayjs/jwt';

// 用户注册
export const register = Api(Post(), async (username: string, password: string) => {
    const ctx = useContext<Context>();
    if (ctx.user.role !== 'admin') {
        return { success: false, message: '你没有权限' }
    }
    if (!username || !password) {
        return { success: false, message: '参数错误' }
    }
    const userService = await useInject(UserService);
    const ret = await userService.createUser(username, password);
    return { success: true, data: ret };
});

// 用户登录
export const login = Api(Post('/User/Login'), async (username: string, password: string) => {
    if (!username || !password) {
        return { success: false, message: '参数错误' }
    }
    const { userModel } = await useInject(UserService);
    const ret = await userModel.findOne({
        username,
        password,
    })
    if (!ret) return { success: false, message: '账号或密码错误' }
    // 生成token
    const jwtService = await useInject(JwtService);
    const token = jwtService.signSync({ _id: ret._id, role: ret.role })
    return { success: true, data: token, message: '登入成功' };
});

// 用户信息
export const info = Api(Post('/User/Info'), async () => {
    const ctx = useContext<Context>();
    const { userModel } = await useInject(UserService);
    const ret = await userModel.findById(ctx.user._id, '-password')
    return { success: true, data: ret }
});

// 修改密码
export const changePassword = Api(Post(), async (oldPass: string, newPass: string) => {
    if (!newPass || !oldPass) {
        return { success: false, message: '参数错误' }
    }
    const ctx = useContext<Context>();
    const userService = await useInject(UserService);
    return await userService.changePassword(ctx.user._id, oldPass, newPass);
});