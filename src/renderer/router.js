import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Upload = () => import('./pages/upload.vue'/* webpackChunkName: "kindle_sender_upload" */);

// 2. 定义路由
const routes = [
    { path: '', redirect: { name: 'Login' } },
    { path: '/login', component: Upload, name: 'Login' },
    { path: '/upload', component: Upload, name: 'Upload' },
];

// 3. 创建 router 实例，然后传 `routes` 配置
export default new VueRouter({
    routes,
});
