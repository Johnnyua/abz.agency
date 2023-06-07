<template>
    <div class="form__file file">
        <div class="file_block">
            <input id="file_upload" type="file" accept="image/jpeg" @change="uploadFile" ref="file">
            <label :class="{ error: error !== '' }" for="file_upload">Upload</label>
            <span :class="{ error: error !== '', file_added: file !== null }">{{ fileName }}</span>
        </div>
        <span v-show="error !== ''" class="error">{{ error }}</span>
    </div>
</template>

<script>
export default {
    name: 'vUploadFile',
    data() {
        return {
            file: null,
            fileName: 'Upload your photo',
        }
    },
    props: {
        error: {
            type: String,
            default: ''
        }
    },
    methods: {
        uploadFile(e) {
            this.file = e.target.files[0];
            this.fileName = this.file.name;
            this.$emit('uploadFile', this.file);
        }
    },
}
</script>

<style lang="scss" scoped>
.form__file {
    width: 100%;
}

.file_block {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 54px;

    input {
        display: none;
    }

    label {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-basis: 84px;
        border: 1px solid #000;
        border-radius: 4px 0px 0px 4px;
        cursor: pointer;
        height: 100%;
        text-align: center;
    }

    span {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-basis: 296px;
        border: 1px solid #000;
        border-left: none;
        color: $thirdColor;
        padding-left: 10px;
        height: 100%;
    }

    .file_added {
        color: inherit;
    }
}</style>