<template>
  <div>
    <el-row type="flex" class="main" justify="center">
      <el-col style="width:950px" class="left">
        <keep-alive exclude="detail">
          <router-view></router-view>
        </keep-alive>
      </el-col>
      <el-col
        v-if="flag&&$route.name!='detail'&&$route.name!='newitem'"
        style="width:250px"
        class="right"
      >
        <home-main-right></home-main-right>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    HomeMainRight: () => import("@/components/HomeMainRight")
  },
  computed: {
    flag() {
      let wid = document.body.offsetWidth + 16;
      if (wid <= 1200) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.main {
  padding: 6px;
  box-sizing: border-box;
}
.el-col {
  margin: 0 3px;
}
@media screen and (max-width: 1200px) {
  .right {
    display: none;
  }
  .left {
    width: 100%;
  }
}
</style>