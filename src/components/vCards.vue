<template>
    <ul class="cards">
        <transition-group name="cards">
            <v-card-item 
                v-for="user in users" 
                :key="user.id" 
                :user="user">
            </v-card-item>
        </transition-group>
    </ul>
</template>

<script>
export default {
    name: 'vCards',
    props: {
        users: {
            type: Array,
            default: () => [],
        }
    }
}
</script>

<style lang="scss" scoped>
.cards-enter-active {
    opacity: 1;
    transition: all 1s ease-in-out;
}

.cadrs-leave-active {
    transition: all 1s ease-in-out;
}

.cards-enter-from {
    opacity: 0;
    transform: translateY(1000px);
}

.cards-leave-to {
    opacity: 0;
    transform: translateY(-100px);
}

.list-move {
    transition: transform 1s ease;
}
</style>