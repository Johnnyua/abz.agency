<template>
    <div class="input_box">
        <input :class="{ error: error !== '' }" :value="modelValue" @focus="error = ''" @input="updateInput" @blur="showLabel = modelValue !== ''" :placeholder="placeholder"/>
        <label :class="{error: error !== '' }" v-show="showLabel">
            <slot></slot>
        </label>
        <span  v-show="error !== ''" class="error">{{ error }}</span>
    </div>
</template>

<script>
export default {
    name: 'vInput',
    data() {
        return {
            showLabel: false,
        }
    },
    props: {
        modelValue: "",
        error: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''    
        }
    },
    methods: {
        updateInput(e) {
            if (this.modelValue) {
                this.showLabel = true;
            }
            this.$emit("update:modelValue", e.target.value)
        }
    },
}
</script>

<style lang="scss" scoped>
.input_box {
    position: relative;
    width: 100%;

    input:not([type=radio]) {
        background-color: $bgColor;
        border: 1px solid $borderColor;
        max-width: 380px;
        width: 100%;
        height: 54px;
        padding: 14px 16px;
    }

    label {
        align-self: baseline;
        background-color: $bgColor;
        color: $thirdColor;
        position: absolute;
        top: 0;
        left: 10px;
        transform: translateY(-50%);
        z-index: 5;
    }
    


}
</style>