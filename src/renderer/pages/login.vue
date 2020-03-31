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
            <at-button type="primary">
                登录
            </at-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        directives: {},
        components: {},
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                email: '',
                password: '',
            };
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
        },
        filters: {},
        methods: {
            /* Notice: 复杂的方法，写下说明 */
        },
        watch: {
            /* Notice: 写下说明 */
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        errorCaptured() {
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