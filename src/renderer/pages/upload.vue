<template>
    <div class="upload-root">
        <header style="text-align: right;padding: 0 10px;font-size: 18px;">
            <at-dropdown @on-dropdown-command="handleLogOut">
                <span>
                    <i class="icon icon-user" style="border: 1px solid #000;border-radius: 50%;"></i>
                    <i class="icon icon-chevron-down"></i>
                </span>
                <at-dropdown-menu slot="menu" style="text-align: center;">
                    <at-dropdown-item>退出</at-dropdown-item>
                </at-dropdown-menu>
            </at-dropdown>
        </header>

        <img src="../assets/kindle-sender.png"/>

        <div class="upload__body">
            <ul v-if="files.length">
                <li v-for="file in files" :key="file.id">
                    <span>{{file.name}}</span> -
                    <span>{{file.size | formatSize}}</span> -
                    <span v-if="file.error">{{file.error}}</span>
                    <span v-else-if="file.success">success</span>
                    <span v-else-if="file.active">active</span>
                    <span v-else></span>
                </li>
            </ul>
            <div v-else>
                <h4>Drop files anywhere to upload<br/>or</h4>
                <label for="file">Select Files</label>
            </div>
        </div>

        <at-button
            v-if="files.length > 0 && $refs.upload && !$refs.upload.active"
            type="success"
            icon="icon-upload"
            :disabled="isLoading"
            @click.prevent="handleStartUpload">
            {{ isLoading ? '正在上传中...' : '开始上传' }}
        </at-button>

        <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active__mask">
            <h3>Drop files to upload</h3>
        </div>

        <file-upload
            v-model="files"
            ref="upload"
            style="display: none;"
            :multiple="true"
            :drop="true"
            :drop-directory="true">
        </file-upload>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import store from '../store';

    export default {
        name: 'upload',
        components: {},
        data() {
            return {
                files: [],
                isLoading: false,
            };
        },
        computed: {
            ...mapState({
                vxAccount: state => state.accountInfo,
            }),
        },
        methods: {
            ...mapActions({
                vxLogout: 'logout',
            }),
            // 开始上传
            handleStartUpload() {
                const files = this.files.map(e => e.file.path);
                try {
                    this.isLoading = true;
                    this.$Loading.start();
                    this.$kindle.push({
                        to: this.vxAccount.toMail,
                        from: this.vxAccount.fromMail,
                        sender: {
                            email: this.vxAccount.fromMail,
                            password: this.vxAccount.password,
                        },
                        files,
                    }, (result) => {
                        if (result.stat !== 'error') {
                            this.$Message.success(`恭喜,${this.files[0].name}等${files.length}个文件已成功推送到您的kindle!`);
                        }
                        this.isLoading = false;
                        this.$Loading.finish();
                        this.files = [];
                    });
                } catch (error) {
                    this.$Message.error(`发送失败...失败详情如下: ${error.message}`);
                    this.isLoading = false;
                    this.$Loading.error();
                    throw error;
                }
            },
            handleLogOut() {
                this.vxLogout();
                this.$router.push({
                    name: 'Login',
                });
            },
        },
        beforeRouteEnter(to, from, next) {
            const isLoggedIn = store.getters.isLogin;
            if (!isLoggedIn) {
                next({ name: 'Login' });
                return;
            }
            next();
        },
    };
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    .upload-root {
        padding: 40px;
    }

    .upload-root > img {
        margin: 0 auto 10px;
        display: block;
    }

    .upload__body {
        width: 100%;
        margin-bottom: 20px;
    }

    .upload__body label.btn {
        margin-bottom: 0;
        margin-right: 1rem;
    }

    .upload-root .drop-active__mask {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 9999;
        opacity: .6;
        text-align: center;
        background: #000;
    }

    .upload-root .drop-active__mask h3 {
        margin: -.5em 0 0;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        font-size: 40px;
        color: #fff;
        padding: 0;
    }
</style>