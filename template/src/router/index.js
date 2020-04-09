import Vue from 'vue';
import VueRouter from 'vue-router';
import TestPage from '@/pages/index/TestPage/index.vue'; // 测试页面

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: TestPage
    }
    // {
    //     path: '*',
    //     component: ''
    // }
];

// router实例 在此处可配置滚动行为 scrollBehavior
const router = new VueRouter({
    routes: routes
});

export default router;
