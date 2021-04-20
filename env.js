module.exports = {
    dev: {
        MODE: 'development',
        ENV_API: 'https://www.bygit.cn'   //测试服务器地址
    },
    pro: {
        MODE: 'production',
        ENV_API: 'http://localhost:8086'  // 正式服务器地址 java的本地端口
    }
}
