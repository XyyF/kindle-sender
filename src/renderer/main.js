import Vue from 'vue';
// 插件注册
import './plugins/at-ui';
import './plugins/kindle';
import './plugins/file-upload';
// 组件入口
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
