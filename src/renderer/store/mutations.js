export default {
    setAccount(state, account) {
        window.localStorage.ACCOUNT = account;
        state.accountInfo = account;
    },
};
