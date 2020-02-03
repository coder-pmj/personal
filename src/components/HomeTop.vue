<template>
  <el-row type="flex" class="top" justify="center">
    <el-col style="width:790px">
      <router-link to="/home" tag="a" class="name">逗趣er</router-link>
      <span class="txt">浏览天下事</span>
    </el-col>
    <el-col style="width:400px">
      <el-col :span="6">
        <a v-show="$route.name!='newitem'" href="/newitem" target="_blank" class="top-a">发布动态</a>
      </el-col>
      <el-col :span="8">
        <a href="http://github.com/Pmj136" target="_blank" class="top-a">作者GitHub</a>
      </el-col>

      <el-col :span="10">
        <a
          @mouseenter="showDetail"
          @mouseleave="hideDetail"
          href="https://docschina.org/"
          target="_blank"
          class="top-a2"
        >{{docschina}}</a>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      docschina: "印记中文"
    };
  },
  methods: {
    showDetail() {
      this.docschina = "前端领域优质文档汇总";
    },
    hideDetail() {
      this.docschina = "印记中文";
    }
  }
};
</script>

<style scoped>
.top {
  z-index: 2001;
  height: 3rem;
  line-height: 3rem;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}
.name {
  text-decoration: none;
  font-size: 1.4rem;
  color: #1890ff;
  cursor: pointer;
}
.txt {
  font-size: 0.6rem;
  color: #999;
  display: inline-block;
  padding-left: 0.3rem;
}
.top-a {
  text-decoration: none;
  outline: none;
  cursor: pointer;
  color: rgb(128, 123, 123);
  font-size: 15px;
}
.top-a2 {
  color: #f89812;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  font-size: 15px;
}
.top-a:hover {
  color: red;
}
</style>