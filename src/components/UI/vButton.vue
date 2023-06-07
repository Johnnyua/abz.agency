<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'vButton',
}
</script>

<style lang="scss" scoped>
.button {
    background-color: $primaryColor;
    border: none;
    border-radius: 80px;
    cursor: pointer;
    font-size: inherit;
    line-height: inherit;
    width: 100px;
    height: 34px;
    &[disabled] {
        background-color: $disabledButtonColor;
        color: #FFFFFF;
    }
}
</style>