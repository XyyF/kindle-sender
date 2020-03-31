import Vue from 'vue';
import FileUpload from 'vue-upload-component/src';

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
