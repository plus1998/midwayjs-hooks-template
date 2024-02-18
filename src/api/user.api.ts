import { Context } from '@midwayjs/koa';
import { UserService } from './service/user.service';
import { Api, Post, useInject, useContext } from '@midwayjs/hooks';

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
        return { success: false, message: '参数错误', data: {} }
    }
    const userService = await useInject(UserService);
    return await userService.login(username, password);
});

// 刷新token
export const refreshToken = Api(Post('/User/RefreshToken'), async (refreshToken: string) => {
    const userService = await useInject(UserService);
    return await userService.refreshToken(refreshToken);
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