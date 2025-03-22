module.exports = {
  apps: [
    {
      name: 'hooks_demo',
      script: 'npm', // 要执行的脚本路径
      args: ['start', '--port=3000'], // 脚本参数
      exec_mode: 'cluster', // 启用 Cluster 模式
      instances: 'max', // 根据 CPU 核心数自动分配进程数
      env: {
        MIDWAY_SERVER_ENV: 'prod', // 环境变量
      },
      error_file: './logs/error.log', // 错误日志路径（可选）
      out_file: './logs/out.log', // 输出日志路径（可选）
    },
  ],
};
