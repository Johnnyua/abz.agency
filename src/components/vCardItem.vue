<template>
    <li class="card__item" @mouseover.stop="showToolTip">
        <div class="card__img">
            <img v-if="user.photo == ''" src="@/assets/img/photo-cover.svg" alt="User photo">
            <img v-else :src="user.photo" alt="User photo">
        </div>
        <v-text class="card__title">{{ user.name }}
        <v-tool-tip class="card__item__tooltip" :text="user.name"></v-tool-tip>
        </v-text>
        <div class="card__text text">
            <v-text class="text__position">{{ user.position }}</v-text>
            <v-text class="text__email">{{ user.email }}
            <v-tool-tip class="card__item__tooltip" :text="user.email"></v-tool-tip>
            </v-text>
            <v-text class="text__phone">{{ user.phone }}</v-text>
        </div>
    </li>
</template>

<script>
export default {
    name: 'vCardItem',
    props: {
        user: {
            type: Object,
            default: () => { },
        }
    },
    methods: {
        showToolTip() {

        }
    }
}
</script>

<style lang="scss" scoped>
.card__item {
    display: grid;
    background-color: #fff;
    grid-template: auto 1fr minmax(40px, auto) / 1fr;
    padding: 20px;
    gap: 20px;
    justify-items: center;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
}

.card__title,
.text__email {
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card__title:hover,
.text__email:hover {
    .card__item__tooltip {
        transform: translate(-60%,70%);
        opacity: 1;
    }
}

.card__text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card__img {
    width: 70px;

    img {
        border-radius: 50%;
    }
}



</style>