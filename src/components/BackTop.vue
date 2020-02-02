<template>
  <div v-show="flag" class="back" @click="goTop">
    <i class="el-icon-caret-top"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleBack);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleBack);
  },
  methods: {
    handleBack() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top > 800) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    goTop() {
      let scrollToptimer = setInterval(function() {
        const top = document.body.scrollTop || document.documentElement.scrollTop;
        const speed = top / 4;
        if (document.body.scrollTop != 0) {
          document.body.scrollTop -= speed;
        } else {
          document.documentElement.scrollTop -= speed;
        }
        if (top == 0) {
          // window.console.log(top)
          clearInterval(scrollToptimer);
        }
      }, 10);
    }
  }
};
</script>

<style scoped>
.back {
  color: blue;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 2000;
  font-size: 3rem;
}
</style>