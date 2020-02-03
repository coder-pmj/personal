<template>
  <div>
    <el-card style="margin-bottom:15px" v-show="flag">
      <div class="item-child">
        <a class="item-a">{{data.title}}</a>
      </div>
      <div class="item-icon item-child item-icon-txt">
        <el-avatar :size="50" :src="data.user[0].avatar"></el-avatar>

        <div style="margin-left:15px;line-height:30px;">
          <div style="font-weight:600;color:burlywood">
            {{data.user[0].name}}
            <!--
           <el-button  style="padding:5px 10px;font-size:10px;" round>关注</el-button>
            -->
          </div>
          <div>
            <span>
              <i class="el-icon-date" v-show="data.date"></i>
              {{data.date}}
            </span>

            <span style="margin-left:20px" v-show="data.people">
              <i class="el-icon-view"></i>
              {{data.people}}
            </span>
            <span style="margin-left:20px" v-show="data.people">
              <i class="el-icon-chat-dot-square"></i>
              {{data.comment.length}}
            </span>
          </div>
        </div>
      </div>
      <el-image
        v-if="data.img"
        class="item-img"
        :src="data.img"
        @load="flag=true"
        :preview-src-list="[data.img]"
      ></el-image>
      <div class="item-text">{{data.text}}</div>
      <div style="margin:10px 0">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="写下您的评论……"
          @click.native="showSend=true"
          v-model="textarea"
        ></el-input>
        <div style="float:left;margin:20px 0;color:#999">enter发布</div>
        <div style="float:right;margin:20px 0">
          <el-button size="mini" type="warning" round>发布</el-button>
          <el-button size="mini" round>取消</el-button>
        </div>

        <div style="margin-top:100px">
          <el-badge :value="data.comment.length">
            <el-button disabled size="small">列表评论</el-button>
          </el-badge>

          <el-collapse v-model="activeName">
            <el-collapse-item :name="index" v-for="(it,index) in data.comment" :key="index">
              <template slot="title">
                <el-avatar :size="30" :src="it.avatar"></el-avatar>
                <div style="margin-left:20px">{{it.name}}</div>
              </template>
              <div style="color:#999;margin-left:50px">{{it.value}}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
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
      data: {},
      flag: false,
      textarea: "",
      activeName: []
    };
  },
  methods: {
    getData(id) {
      getDetail(id).then(res => {
        this.arr = res.data;
        this.data = this.arr[0];
        for (let i = 0; i < this.data.comment.length; i++) {
          this.activeName.push(i);
        }
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
  color: burlywood;
  margin: 0 0 20px 0;
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

.bottom-wrap {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
</style>  