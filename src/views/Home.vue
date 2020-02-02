<template>
  <div class="home">
    <home-top class="top"></home-top>
    <home-main></home-main>
    <back-top />
    <toogle />
  </div>
</template>

<script>
import BackTop from "@/components/BackTop";
// import HomeTop from "@/components/HomeTop";
// import HomeMain from "@/components/HomeMain";
// import Toogle from "@/components/Toogle";
export default {
  components: {
    BackTop,
    HomeTop:()=>import('@/components/HomeTop'),
    HomeMain:()=>import('@/components/HomeMain'),
    Toogle:()=>import('@/components/Toogle')
  }
};
</script>

<style scoped>
.home {
  height: 100%;
}

.top {
  background-color: white;
}
@media screen and (max-width: 1220px) {
  .top {
    display: none;
  }
}
</style>