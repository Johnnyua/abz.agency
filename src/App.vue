<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 1170px;
  min-width: 360px;
  height: 100vh;
  margin: 0 auto;
}
</style>