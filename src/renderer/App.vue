<template>
    <div class="kindle-sender-root">
        <img src="./assets/kindle-sender.png"/>

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
                <label for="file" class="btn btn-lg btn-primary">Select Files</label>
            </div>
        </div>

        <at-button
            v-if="$refs.upload && !$refs.upload.active"
            type="success"
            icon="icon-upload"
            @click.prevent="$refs.upload.active = true">
            开始上传
        </at-button>
        <at-button
            v-else
            type="error"
            icon="icon-stop-circle"
            @click.prevent="$refs.upload.active = false">
            中止上传
        </at-button>

        <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active__mask">
            <h3>Drop files to upload</h3>
        </div>

        <file-upload
            v-model="files"
            ref="upload"
            post-action="/upload/post"
            style="display: none;"
            :multiple="true"
            :drop="true"
            :drop-directory="true">
        </file-upload>
    </div>
</template>

<script>

    export default {
        name: 'kindle-sender',
        components: {},
        data() {
            return {
                files: [],
            };
        },
    };
</script>

<style>
    .kindle-sender-root {
        padding: 20px;
    }

    .kindle-sender-root > img {
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

    .kindle-sender-root .drop-active__mask {
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

    .kindle-sender-root .drop-active__mask h3 {
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