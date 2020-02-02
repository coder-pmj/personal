<template>
  <div ref="wrap">
    <el-card :class="{'ceil':isCeil}">
      <right-more1-child />
    </el-card>
  </div>
</template>

<script>
// import RightMore1Child from "./RightMore1Child";
export default {
  data() {
    return {
      isCeil: false,
      flag: true
    };
  },
  components: {
    RightMore1Child:()=>import('./RightMore1Child')
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let top = this.$refs.wrap.getBoundingClientRect().top;
      if (top < 65) {
        if (this.flag) {
          this.isCeil = true;
          this.flag = false;
        }
      } else {
        this.isCeil = false;
        this.flag = true;
      }
    }
  }
};
</script>

<style scoped>
.el-card {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}
.ceil {
  position: fixed;
  width: 248px;
  top: 3.8rem;
}
</style>