<template>
  <div>
    <el-row>
      <personal />
    </el-row>
    <el-row>
      <right-more1 />
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    Personal: () => import("@/components/Personal"),
    RightMore1: () => import("@/components/RightMore1")
  }
};
</script>

<style scoped>
.el-row {
  margin: 0 0 6px 0;
}
</style>