<template>
    <div class="kindle-sender-root">
        <div class="upload">
            <ul v-if="files.length">
                <li v-for="(file, index) in files" :key="file.id">
                    <span>{{file.name}}</span> -
                    <span>{{file.size | formatSize}}</span> -
                    <span v-if="file.error">{{file.error}}</span>
                    <span v-else-if="file.success">success</span>
                    <span v-else-if="file.active">active</span>
                    <span v-else></span>
                </li>
            </ul>
            <ul v-else>
                <td colspan="7">
                    <div class="text-center p-5">
                        <h4>Drop files anywhere to upload<br/>or</h4>
                        <label for="file" class="btn btn-lg btn-primary">Select Files</label>
                    </div>
                </td>
            </ul>

            <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
                <h3>Drop files to upload</h3>
            </div>
        </div>

        <at-button v-if="$refs.upload && !$refs.upload.active" @click.prevent="$refs.upload.active = true">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
            开始上传
        </at-button>
        <at-button v-else @click.prevent="$refs.upload.active = false">
            <i class="fa fa-stop" aria-hidden="true"></i>
            中止上传
        </at-button>

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
    .kindle-sender-root label.btn {
        margin-bottom: 0;
        margin-right: 1rem;
    }

    .kindle-sender-root .drop-active {
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

    .kindle-sender-root .drop-active h3 {
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