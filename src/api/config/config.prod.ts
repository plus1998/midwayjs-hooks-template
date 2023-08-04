export default {
    keys: 'hooks_demo-prod',
    jwt: {
        secret: 'hooks_demo-prod',
        expiresIn: '30d'
    },
    mongoose: {
        dataSource: {
            default: {
                uri: 'mongodb://localhost/hooks_demo-prod',
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