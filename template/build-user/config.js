module.exports = {
    appVersion: "1.0.0", // 项目版本
    appUrl: "/test/t1/", // 项目路径  如   /mobile/test/
    list: [
        { title: "1505-stable", url: "//static.tcy365.org:1505", env: 1505 },
        { title: "1507-test", url: "//static.tcy365.org:1507", env: 1507 },
        { title: "1506-develop", url: "//static.tcy365.org:1506", env: 1506 },
        { title: "2505-pre", url: "//static.tcy365.com:2505", env: "pre" },
        { title: "80-static", url: "//static.tcy365.com", env: "production" }
    ],
    // 暂不用px转rem方案   改用viewport方案，可切换
    px2rem: {
        rootValue: 100, // 换算的基数
        selectorBlackList: ["van-"], // 忽略转换正则匹配项 ['van-']
        propList: ["*"]
    },
    isFile: false, //是否使用文件夹
    showPage: [],
    devServer: {
        // host: 'localhost', // 新脚手架：localhost，本机ip
        // port: 8080, // 端口号
        https: false,
        open: true, // 配置自动启动浏览器
        index: "dest/index.html",
        // 配置多个代理
        proxy: {
            "/api": {
                target: "http://yapi.tcy365.org:3000/mock/614/", // 本地模拟数据服务器
                changeOrigin: true
                // pathRewrite: {
                //     '^/api': '/api' // 去掉接口地址中的api字符串
                // }
            }
        }
    }
};
