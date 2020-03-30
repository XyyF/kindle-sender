import Vue from 'vue';
import AtComponents from 'at-ui';
import FileUpload from 'vue-upload-component/src';
// 引入组件样式
import 'at-ui-style/src/index.scss';

import App from './App';

Vue.config.productionTip = false;

Vue.use(AtComponents);
Vue.component('file-upload', FileUpload);

Vue.filter('formatSize', (size) => {
    if (size > 1024 * 1024 * 1024 * 1024) {
        return `${(size / 1024 / 1024 / 1024 / 1024).toFixed(2)} TB`;
    } else if (size > 1024 * 1024 * 1024) {
        return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
    } else if (size > 1024 * 1024) {
        return `${(size / 1024 / 1024).toFixed(2)} MB`;
    } else if (size > 1024) {
        return `${(size / 1024).toFixed(2)} KB`;
    }
    return `${size.toString()} B`;
});

/* eslint-disable no-new */
new Vue({
    components: { App },
    template: '<App/>',
}).$mount('#app');
