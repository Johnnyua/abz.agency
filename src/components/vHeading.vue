<template>
    <h1 class="heading">
        <slot></slot>
    </h1>
</template>

<script>
export default {
    name: 'vHeading',
}
</script>

<style lang="scss" scoped>
    .heading {
        font-size: 40px;
        line-height: 1;
    }
</style>