<template>
  <div class="app-container">
    <template v-if="$route.path==='/'">
      <transition enter-active-class="animated fadeInDown">
        <router-view></router-view>
      </transition>
    </template>
    <template v-else>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </template>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.app-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: auto;
}
</style>