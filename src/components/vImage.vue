
<template>
        <img :src="imageSrc" :alt="altImage"  />
</template>

<script>
export default {
    name: 'vImage',
    props: {
        imageName: {
            type: String,
            default: ''
        },
        altImage: {
            type: String,
            default: 'Image'
        },
    },
    computed: {
        imageSrc() {
            return new URL(`../assets/img/${this.imageName}`, import.meta.url).pathname;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>