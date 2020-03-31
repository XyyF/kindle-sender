export default {
    login({ commit }, params) {
        commit('setAccount', params);
    },
};
