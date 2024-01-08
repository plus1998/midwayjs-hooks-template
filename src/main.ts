import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import '../tailwind.css'

import App from './App.vue';
import router from './router';

import { message } from "ant-design-vue";

createApp(App).use(Antd).use(router).mount('#app');

// 请求拦截器
import { setupHttpClient } from '@midwayjs/rpc';
import type { Middleware } from '@midwayjs/rpc';
import axios from 'axios';

let isRefreshing = false;

const refreshToken = async () => {
    while (isRefreshing) {
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
    isRefreshing = true;
    try {
        const { refreshToken } = await import('./api/user.api');
        const { data } = await refreshToken(localStorage.getItem('REFRESH_TOKEN'));
        localStorage.setItem('TOKEN', data.token);
        console.log('刷新token成功');
    } catch (error) {
        console.error('刷新token失败:', error.message);
        throw error;
    }
};

const ErrorHandler: Middleware = async (
    ctx,
    next
) => {
    try {
        ctx.req.headers.authorization = 'Bearer ' + localStorage.getItem('TOKEN')
        await next();
    } catch (err) {
        switch (err.status) {
            case 401:
                try {
                    await refreshToken();
                    ctx.req.headers.authorization = 'Bearer ' + localStorage.getItem('TOKEN')
                    const ret = await axios.request(ctx.req);
                    ctx.res = ret.data;
                } catch (error) {
                    console.error('刷新token后重新请求接口失败:', error.message);
                    location.href = '#/login';
                } finally {
                    isRefreshing = false;
                }
                break;
            case 500:
                message.error('Internal Server Error');
                break;
            default:
                message.error(
                    `Unknown Error, status: ${err.status}`
                );
                break;
        }
    }
};

setupHttpClient({
    middleware: [ErrorHandler],
});