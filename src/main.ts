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
                  location.href = '#/login';
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