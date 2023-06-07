<template>
        <img :src="imageURL" :alt="altImage"  />
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
}
</script>

<style lang="scss" scoped>

</style>