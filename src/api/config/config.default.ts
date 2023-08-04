export default {
    keys: 'demo',
    midwayLogger: {
        default: {
            level: 'info',
            consoleLevel: 'warn',
        },
    },
    jwt: {
        secret: 'demo-dev',
        expiresIn: '30d',
    },
    // mongoose
    mongoose: {
        dataSource: {
            default: {
                uri: 'mongodb://localhost/demo',
                options: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    user: 'root',
                    pass: '123456',
                    authSource: 'admin',
                },
                // 关联实体
                entities: ['/entity'],
            }
        }
    },
};
