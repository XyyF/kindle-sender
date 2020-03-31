export default {
    setAccount(state, account) {
        window.localStorage.ACCOUNT = JSON.stringify(account);
        state.accountInfo = account;
    },
};
