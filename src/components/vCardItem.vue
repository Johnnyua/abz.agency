<template>
    <li class="card__item" @mouseover.stop="showToolTip">
        <div class="card__img">
            <v-image v-if="user.photo == ''" :imageName="userCoverName" alt="'User photo'"></v-image>
            <v-image v-else :src="user.photo" :alt="'User photo'"></v-image>
        </div>
        <h3 class="card__title">
            {{ user.name }}
            <v-tool-tip class="card__item__tooltip" :text="user.name" />
        </h3>
        <div class="card__text text">
            <v-text class="text__position">{{ user.position }}</v-text>
            <v-text class="text__email">
                {{ user.email }}
                <v-tool-tip class="card__item__tooltip" :text="user.email"></v-tool-tip>
            </v-text>
            <v-text class="text__phone">{{ user.phone }}</v-text>
        </div>
    </li>
</template>

<script>
export default {
    name: 'vCardItem',
    data() {
        return {
            userCoverName: 'photo-cover.svg',
        }
    },
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
    max-width: 100%;
}

.card__title:hover,
.text__email:hover {
    .card__item__tooltip {
        transform: translate(-100%, -50%);
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