import Vue from 'vue';
// 插件注册
import './plugins/at-ui';
import './plugins/kindle';
import './plugins/file-upload';
// 组件入口
import App from './App';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { App },
    template: '<App/>',
}).$mount('#app');
