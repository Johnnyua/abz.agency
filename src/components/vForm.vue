<template>
    <form class="form content"  method="post">
        <div class="form__content content">
            <v-input v-model.trim="user.name" :error="error.name" type="text" placeholder="Your Name">Your Name</v-input>
            <v-input v-model.trim="user.email" :error="error.email" type="email" placeholder="Email">Email</v-input>
            <div class="form__phone content">
                <v-input v-model.trim="user.phone" :error="error.phone" type="text" placeholder="Phone">Phone</v-input>
                <span v-if="error.phone === ''" class="phone__mask">+38 XXX XXX XX XX</span>
            </div>
            <div class="form__position content">
                <v-radio :options="radioValues.positionsList" v-model="radioValues.defaultPosition"></v-radio>
            </div>
            <v-upload-file :error="error.image" @uploadFile="uploadFile"></v-upload-file>
        </div>
        <div class="form__btn">
            <v-button type="button" @click="submitForm" :disabled="formButtonDisabled">Sing up</v-button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'vForm',
    data() {
        return {
            user: {
                name: '',
                email: '',
                phone: '',
                position: '',
                photo: null,
            },
            radioValue: null,
            formButtonDisabled: true,
        }
    },
    props: {
        radioValues: {
            type: Object,
            default: () => { }
        },
        error: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    email: '',
                    phone: '',
                    image: '',
                }

            },
        },
    },
    methods: {
        submitForm() {
            this.$emit('submitForm', this.user);
        },
        uploadFile(file) {
            this.user.photo = file;
        },
        checkForm() {

            for (let value of Object.values(this.user)) {
                if (value === '' || value === null) {
                    return true;
                }
            };
            return false;
        },
    },
    watch: {
        user: {
            handler(newVal) {
                this.formButtonDisabled = this.checkForm();
            },
            deep: true
        },
        radioValues: {
            handler(newVal) {
                this.user.position = newVal.defaultPosition;
            },
            deep: true
        },
    }
}
</script>

<style lang="scss" scoped>
.form {
    max-width: 380px;
    width: 100%;

    >* {
        width: 100%;
    }
}

.form__username,
.form__email,
.form__phone {
    gap: 4px;
    width: 100%;
}

.phone__mask {
    align-self: flex-start;
    font-size: 12px;
    line-height: 1.17;
    color: #7E7E7E;
    padding-left: 16px;
}

.form__position {
    align-items: flex-start;
    gap: 7px;
    width: 100%;
}

.form__btn {
    text-align: center;
}
</style>