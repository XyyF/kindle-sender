import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const accountInStorage = JSON.parse(window.localStorage.ACCOUNT || '{}');
// initial state
const state = {
    /**
     * 账户信息
     * email 邮箱信息
     * password 邮箱密码信息
     */
    accountInfo: accountInStorage,
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {},
});

// 热更新
if (module.hot) {
    module.hot.accept([
        // state不支持热更新
        './getters',
        './actions',
        './mutations',
    ], () => {
        store.hotUpdate({
            // 获取更新后的模块。因为 babel 6 的模块编译格式问题，这里需要加上 .default
            getters: require('./getters').default,
            actions: require('./actions').default,
            mutations: require('./mutations').default,
            modules: {},
        });
    });
}

export default store;
