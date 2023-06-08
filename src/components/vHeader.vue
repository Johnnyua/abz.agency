<template>
    <div class="header container">
        <div class="header__logo">
            <v-image 
                :imageName="logoName"
                :altImage="'Logo'"
                @click="$router.push('/')"
            />
        </div>
        <div class="header__btn">
            <v-button>Users</v-button>
            <v-button>Sing up</v-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vHeader',
    data() {
        return {
            logoName: 'Logo.svg',
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 60px;
}

.header__logo {
    cursor: pointer;
    max-width: 104px;
    width: 100%;
}

.header__btn {
    display: flex;
    gap: 10px;
}
</style>