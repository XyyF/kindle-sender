export default {
    login({ commit }, params) {
        commit('setAccount', params);
    },
    logout({ commit }) {
        commit('setAccount', null);
    },
};
