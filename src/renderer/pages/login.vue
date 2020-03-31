<template>
    <div class="login-root">
        <!-- Block-Element--Modifier-->
        <img src="../assets/kindle-sender.png"/>

        <div class="login__body">
            <at-input v-model="email" placeholder="请输入邮箱">
                <i slot="prepend" class="icon icon-user"></i>
            </at-input>
            <at-input v-model="password" placeholder="请输入密码">
                <i slot="prepend" class="icon icon-lock"></i>
            </at-input>
            <at-button type="primary" @click="handleLogin">
                登录
            </at-button>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'login',
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                email: '',
                password: '',
            };
        },
        computed: {
            // 邮箱错误校验
            emailValidor() {
                return false;
            },
        },
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            ...mapActions({
                vxLogin: 'login',
            }),
            async handleLogin() {
                await this.vxLogin({
                    email: this.email,
                    password: this.password,
                });
                this.$Message.success('登录成功');
                this.$router.push({
                    name: 'Upload',
                });
            },
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