import VueRouter from 'vue-router';
import Vue from 'vue';
import store from './store';

Vue.use(VueRouter);

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Login = () => import('./pages/login.vue'/* webpackChunkName: "kindle_sender_login" */);
const Upload = () => import('./pages/upload.vue'/* webpackChunkName: "kindle_sender_upload" */);

// 2. 定义路由
const routes = [
    { path: '', redirect: { name: 'Login' } },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/upload', component: Upload, name: 'Upload' },
];

// 创建 router 实例
const router = new VueRouter({
    routes,
});

router.beforeEach(async (to, from, next) => {
    // 没有登录的话 && to非登录页
    const isToLogin = to.name === 'Login';
    if (!store.getters.isLogin && !isToLogin) {
        // 路由到落地页
        next({ name: 'Login' });
        return;
    }
    next();
});

export default router;
