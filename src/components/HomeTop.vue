<template>
  <el-row type="flex" class="top" justify="center">
    <el-col style="width:790px">
      <router-link to="/home" tag="a" class="name">小小彭</router-link>
      <span class="txt">一位追求梦想的IT萌新</span>
    </el-col>
    <el-col style="width:400px">
      <el-col :span="6">
        <a href="http://github.com/Pmj136" target="_blank" class="top-a">GitHub</a>
      </el-col>

      <el-col :span="8">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link top-a">
            我的活跃社区
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="csdn">csdn</el-dropdown-item>
            <el-dropdown-item command="js">简书</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
    },
    handleCommand(c) {
      switch (c) {
        case "csdn":
          window.open("https://www.csdn.net/");
          break;
        case "js":
          window.open("https://www.jianshu.com/");
          break;
        default:
          break;
      }
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