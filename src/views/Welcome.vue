<template>
  <div class="container">
    <img class="cen img" :src="src" alt="欢迎访问本站" />
    <div class="cen">
      <el-button type="info" disabled>{{time}}s 后自动进入</el-button>
      <el-button @click="into" type="primary">立即进入</el-button>
    </div>
    <span v-show="num" class="cen visiter animated fadeInDown">
      pmj &nbsp;本站访问量:
      <span style="color:cyan">{{visiters}}</span>
    </span>
  </div>
</template>

<script>
import { Notification } from 'element-ui';
import { getVisiter, setVisiter } from "../api";
export default {
  data() {
    return {
      time: 20,
      num: false,
      visiters: "0",
      timer: null,
      src: require("../assets/welcome.png")
    };
  },
  methods: {
    into() {
      Notification.closeAll()
      clearInterval(this.timer);
      this.$router.replace("/home");
    },
    //计时进入
    awaitInto() {
      this.timer = setInterval(() => {
        if (this.time === 1) {
          clearInterval(this.timer);
          this.into();
          return;
        }
        this.time--;
      }, 1000);
    },
    //底部网站计数显示时间
    showBottom() {
      let timer = setTimeout(() => {
        this.num = true;
        clearTimeout(timer);
      }, 1000);
    },
    async getVisiters() {
      let res = await getVisiter();
      this.visiters = res.data;
    },
    async setVisiter() {
      let res = await setVisiter();
      this.visiters = res.data;
    }
  },
  mounted() {
    Notification({
          title: '来自作者',
          message: '对网站有任何建议或者发现bug，欢迎私信作者qq；发现bug或提议被采纳将答谢',
          duration: 0
        });
    //防刷新
    if (!performance.navigation.type) {
      this.setVisiter();
    } else {
      this.getVisiters();
    }
    this.awaitInto();
    this.showBottom();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 800px;
}
.cen {
  align-self: center;
}
.visiter {
  position: fixed;
  bottom: 10px;
  font-family: cursive;
  font-size: 20px;
  cursor: pointer;
}
.img {
  position: relative;
  bottom: 100px;
}
</style>