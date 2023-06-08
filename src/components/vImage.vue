<template>
        <img :src="imageSrc" :alt="altImage"  />
</template>

<script>
export default {
    name: 'vImage',
    props: {
        imageURL: {
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
            return new URL(this.imageURL, import.meta.url).href;
        }
    },
}
</script>

<style lang="scss" scoped>

</style>