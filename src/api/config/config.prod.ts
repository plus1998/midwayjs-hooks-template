export default {
    keys: 'hooks_demo-prod',
    mongoose: {
        dataSource: {
            default: {
                uri: 'mongodb://172.17.0.1/hooks_demo',
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