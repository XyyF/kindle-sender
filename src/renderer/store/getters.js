export default {
    // 是否是登录状态
    isLogin(state) {
        return !!(state.accountInfo && state.accountInfo.fromMail);
    },
};
