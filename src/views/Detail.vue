<template>
  <div>
    <el-card style="margin-bottom:15px">
      <el-page-header @back="goBack" content="详情页"></el-page-header>
      <div class="item-child">
        <a class="item-a">{{data.title}}</a>
      </div>
      <div class="item-icon item-child item-icon-txt">
        <el-tag
          v-show="data.istop"
          type="danger"
          class="item-icon-child"
          effect="dark"
          size="mini"
        >置顶</el-tag>
        <span style="margin-left:20px">
          <i class="el-icon-date" v-show="data.date"></i>
          {{data.date}}
        </span>
        <span style="margin-left:20px">
          <i class="el-icon-reading" v-show="data.people"></i>
          {{data.people}}人
        </span>
      </div>
      <el-image v-if="data.img" class="item-img" :src="data.img" :preview-src-list="[data.img]"></el-image>
      <div class="item-text">{{data.text}}</div>
     
    </el-card>
  </div>
</template>

<script>
import { getDetail } from "../api";
export default {
  name: "detail",
  data() {
    return {
      play: false,
      // id: "",
      arr: [],
      data: {}
    };
  },
  methods: {
    goBack() {
      history.go(-1);
    },
    getData(id) {
      getDetail(id).then(res => {
        this.arr = res.data;
        this.data = this.arr[0];
      });
    }
  },
  created() {
    let id = this.$route.query.id;
    this.getData(id);
  }
};
</script>

<style scoped>
.el-card {
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
.item-child {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  align-items: center;
}
.item-a {
  text-decoration: none;
  font-size: 25px;
  color: black;
  letter-spacing: 0.1em;
  font-weight: 600;
}

.item-icon-txt {
  color: #ccc;
  font-size: 14px;
}
.item-img {
  object-fit: cover;
}
.item-text {
  text-indent: 2em;
  word-wrap: break-word;
  color: #999;
  line-height: 30px;
  letter-spacing: 0.2em;
}
.item-detail {
  float: right;
}
.bottom-wrap {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
</style>  