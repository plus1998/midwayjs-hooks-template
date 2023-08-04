export default {
    keys: 'hooks_demo-unittest',
    jwt: {
        secret: 'hooks_demo-unittest',
        expiresIn: '30d'
    },
    mongoose: {
        dataSource: {
            default: {
                uri: 'mongodb://localhost/hooks_demo-unittest',
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
}