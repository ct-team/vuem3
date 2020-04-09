import Vue from 'vue';
import App from './App';
import router from '@/router/index';
// import store from '@/store';
import '@/assets/css/reset.css'; // 重置样式
import '@/assets/js/fastclick-fix'; // 修复fastclick
import '@/assets/js/comp-global'; // 自定义全局注册组件
import Intertfaces from '@/api/interfaces'; // 接口
import Http from '@/api/http-nat'; // http封装
import HttpOptions from '@/api/http-options'; // http配置

Vue.prototype.$Interfaces = Intertfaces;
Vue.prototype.$Http = Http;
Vue.prototype.$Http.setDefaults(HttpOptions);

new Vue({
    router,
    // store,
    render: h => h(App)
}).$mount('#app');
