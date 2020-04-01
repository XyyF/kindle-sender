export default {
    setAccount(state, account) {
        window.localStorage.PREACCOUNT = JSON.stringify(state.accountInfo);
        state.preAccountInfo = state.accountInfo;
        window.localStorage.ACCOUNT = JSON.stringify(account);
        state.accountInfo = account;
    },
};
