export default {
    midwayLogger: {
        default: {
            level: 'info',
            consoleLevel: 'warn',
        },
    },
    jwt: {
        secret: 'hooks_demo-common',
        expiresIn: '6h',
        refreshToken: {
            expiresIn: '90d'
        }
    },
};
