<template>
    <div class="tooltip-container">
        <slot />
        <div class="tooltip">
            {{ text }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'vToolTip',
    props: {
        text: {
            type: String,
            required: true
        }
    },
}
</script>

<style lang="scss" scoped>
.tooltip-container {
    display: inline-block;
    position: absolute;
    cursor: pointer;
    opacity: 0;
    width: 300px;
    transform: translate(-60%, -50%);
    transition: opacity 1s;
    word-break: break-all;
    word-wrap: break-word;
    white-space: normal;
}

.tooltip {
    color: #ffffff;
    text-align: center;
    padding: 3px 16px;
    border-radius: 2px;
    position: relative;
    background: #000000;
    width: 100%;
    height: 100%;
    word-break: break-all;
    word-wrap: break-word;
    white-space: normal;
}
</style>