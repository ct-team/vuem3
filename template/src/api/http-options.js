// 全局请求拦截器
const requestInterceptor = function(res) {};

// 全局响应成功拦截器
const interceptorSuccess = function(res) {};

// 全局响应失败拦截器
const interceptError = function(res) {
    if (res.Code === 555) {
        console.log('网络错误');
    } else if (res.Code === 666) {
        console.log('连接超时');
    }
};

export default {
    interceptError: interceptError,
    interceptorSuccess: interceptorSuccess,
    requestInterceptor: requestInterceptor,
    timeout: 10000
};
