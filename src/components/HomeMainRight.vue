<template>
  <div>
    <el-row>
      <personal v-if="info.length" />
      <login v-else />
    </el-row>
    <el-row>
      <right-more1 />
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    Personal: () => import("@/components/Personal"),
    RightMore1: () => import("@/components/RightMore1"),
    Login: () => import("@/components/Login")
  },
  computed: {
    ...mapState({
      info: state => state.loginUser.info
    })
  }
};
</script>

<style scoped>
.el-row {
  margin: 0 0 6px 0;
}
</style>