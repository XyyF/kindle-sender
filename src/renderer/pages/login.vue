<template>
    <div class="login-root">
        <!-- Block-Element--Modifier-->
        <img src="../assets/kindle-sender.png"/>

        <div class="login__body">
            <at-input
                v-model="fromMail"
                placeholder="请输入邮箱"
                :maxlength="40">
                <at-tooltip
                    slot="prepend"
                    placement="right"
                    content="推送文件的主体邮箱">
                    <i class="icon icon-user"></i>
                </at-tooltip>
                <at-tooltip
                    v-if="fromMailValidator"
                    slot="append"
                    placement="top"
                    :content="fromMailValidator">
                    <i class="icon icon-info" style="color: #ff4949;"></i>
                </at-tooltip>
            </at-input>
            <at-input
                v-model="password"
                placeholder="请输入授权码"
                :maxlength="20">
                <at-tooltip
                    slot="prepend"
                    placement="right"
                    content="第三方登录主体邮箱的授权码">
                    <i
                        style="cursor: pointer"
                        class="icon icon-lock"
                        @click="handleGoPassword">
                    </i>
                </at-tooltip>
                <at-tooltip
                    v-if="passwordValidator"
                    slot="append"
                    placement="top"
                    :content="passwordValidator">
                    <i class="icon icon-info" style="color: #ff4949;"></i>
                </at-tooltip>
            </at-input>
            <at-input
                v-model="toMail"
                placeholder="请输入"
                :maxlength="40">
                <at-tooltip
                    slot="prepend"
                    placement="right"
                    content="[发送至kindle]的电子邮箱">
                    <i
                        style="cursor: pointer"
                        class="icon icon-mail"
                        @click="handleGoToMail">
                    </i>
                </at-tooltip>
                <at-tooltip
                    v-if="toMailValidator"
                    slot="append"
                    placement="top"
                    :content="toMailValidator">
                    <i class="icon icon-info" style="color: #ff4949;"></i>
                </at-tooltip>
            </at-input>
            <at-button type="primary" @click="handleLogin">
                登录
            </at-button>
        </div>
    </div>
</template>

<script>
    import { shell } from 'electron';
    import { mapState, mapActions } from 'vuex';
    import store from '../store';

    export default {
        name: 'login',
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                fromMail: '',
                password: '',
                toMail: '',
            };
        },
        computed: {
            ...mapState({
                vxPreAccount: state => state.preAccountInfo,
            }),
            // 邮箱错误校验
            fromMailValidator() {
                if (!this.fromMail) return '请输入邮箱';
                if (!/^([a-zA-Z0-9_-]+\.?)+@([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9]{2,4}$/.test(this.fromMail)) {
                    return '请输入正确的邮箱';
                }
                return '';
            },
            passwordValidator() {
                if (!this.password) return '请输入授权码';
                return '';
            },
            toMailValidator() {
                if (!this.toMail) return '请输入邮箱';
                if (!/^([a-zA-Z0-9_-]+\.?)+@([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9]{2,4}$/.test(this.toMail)) {
                    return '请输入正确的邮箱';
                }
                return '';
            },
        },
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            ...mapActions({
                vxLogin: 'login',
            }),
            async handleLogin() {
                await this.vxLogin({
                    fromMail: this.fromMail,
                    password: this.password,
                    toMail: this.toMail,
                });
                this.$Message.success('登录成功');
                this.$router.push({ name: 'Upload' });
            },
            handleGoPassword() {
                shell.openExternal('https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28');
            },
            handleGoToMail() {
                shell.openExternal('https://www.amazon.cn/gp/help/customer/display.html?nodeId=G7NECT4B4ZWHQ8WV');
            },
            initForm() {
                if (!this.vxPreAccount || !this.vxPreAccount.fromMail) return;
                this.fromMail = this.vxPreAccount.fromMail;
                this.password = this.vxPreAccount.password;
                this.toMail = this.vxPreAccount.toMail;
            },
        },
        beforeRouteEnter(to, from, next) {
            const isLoggedIn = store.getters.isLogin;
            if (!isLoggedIn) {
                next();
                return;
            }
            next({ name: 'Upload' });
        },
        mounted() {
            this.initForm();
        },
    };
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    .login-root {
        padding: 20px;
    }

    .login-root > img {
        margin: 0 auto 10px;
        display: block;
    }

    .login__body {
        width: 400px;
        margin: 20px auto;
        padding: 0 30px;
    }

    .login__body .at-input {
        height: 36px;
        margin-bottom: 22px;
    }

    .login__body .at-btn {
        width: 100%;
    }
</style>