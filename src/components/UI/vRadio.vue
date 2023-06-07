<template>
    <div class="positions" v-for="option in options" :key="option.id">
        <input type="radio" @change="changeOptions" :id="options.id" :value="option.name"
            :checked="option.name == modelValue" />
        <label :for="options.id">{{ option.name }}</label>

    </div>
</template>

<script>
export default {
    name: 'vRadio',
    props: {
        modelValue: { type: String, default: null },
        options: { type: Array, default: () => [] }
    },
    methods: {
        changeOptions(e) {
            this.$emit("update:modelValue", e.target.value)
        }
    },
}
</script>

<style lang="scss" scoped>
.positions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
}

input {
    appearance: none;
    border: 1px solid lightgray;
    border-radius: 50%;
    cursor: pointer;
    width: 20px;
    height: 20px;

    &:before {
        content: '';
        display: block;
        width: 60%;
        height: 60%;
        border-radius: 50%;
        margin: 20% auto;
        transform: scale(0);
        transition: 100ms transform ease-in-out;

    }

    &:checked {
        border-color: $secondaryColor;
    }

    &:checked::before {
        background-color: $secondaryColor;
        transform: scale(1);
    }
}
</style>