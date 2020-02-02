<template>
  <el-card class="personal" ref="personal">
    <el-row type="flex" justify="center">
      <el-avatar :size="90" :src="img"></el-avatar>
    </el-row>
    <el-row type="flex" class="author-info" justify="center">
      <div style="color: #1890ff;">小小彭</div>
      <p style="color: #999;font-size:0.9rem">专注于技术的探索</p>
      <div style="text-align:center">
        <el-tag v-for="it in tagData" :key="it.text" :type="it.type" size="mini">
          <a style="text-decoration: none;" :href="it.url" target="_blank">{{it.text}}</a>
        </el-tag>
      </div>
      <el-divider content-position="center">社交账号</el-divider>
      <div>
        <el-tooltip content="点击加我qq" placement="top">
          <img class="img" :src="qq" width="25" alt="qq" @click="openQQ" />
        </el-tooltip>
        <el-tooltip content="微信号:pmj1367559786" placement="top">
          <img class="img" :src="wx" width="25" alt="wx" />
        </el-tooltip>
        <el-tooltip content="抖音号:108770474" placement="top">
          <img class="img" :src="dy" width="25" alt="dy" />
        </el-tooltip>
      </div>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      img: "/api/img/avatar.jpg",
      qq: require("../assets/QQ.png"),
      wx: require("../assets/wx.png"),
      dy: require("../assets/dy.png"),
      tagData: [
        {
          text: "Vue",
          type: "",
          url: "https://cn.vuejs.org/"
        },
        {
          text: "React",
          type: "success",
          url: "https://react.docschina.org/"
        },
        {
          text: "原生JavaScript",
          type: "info",
          url: "https://zh.javascript.info/"
        },
        {
          text: "express",
          type: "warning",
          url: "http://www.expressjs.com.cn/"
        },
        {
          text: "koa",
          type: "danger",
          url: "https://koa.bootcss.com/"
        },
        {
          text: "nodejs",
          type: "success",
          url: "http://nodejs.cn/api/"
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.personal.$el.style.transform = "rotateY(360deg)";
    });
  },
  methods: {
    openQQ() {
      window.location.href = "tencent://message/?uin=1367559786";
    }
  }
};
</script>

<style scoped>
.personal {
  transition: 1.5s;
}

.el-card {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}
.author-info {
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.el-tag {
  margin: 3px;
}
.img {
  margin: 0 15px;
}
</style>