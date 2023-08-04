export default {
    keys: 'hooks_demo-local',
    jwt: {
        secret: 'hooks_demo-local',
        expiresIn: '30d'
    },
    mongoose: {
        dataSource: {
            default: {
                uri: 'mongodb://localhost/hooks_demo',
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