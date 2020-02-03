<template>
  <el-collapse v-model="activeName" style="position:relative">
    <el-collapse-item :name="index" v-for="(it,index) in comment" :key="index">
      <template slot="title">
        <el-avatar :size="30" :src="it.avatar"></el-avatar>

        <div style="margin-left:20px;display:flex;align-items:center">
          <span style="font-size:16px;color:black">{{it.name}}</span>
          <span style="color:#999;margin-left:20px">
            <el-tag size="mini" v-show="flag">回复</el-tag>
            <span v-show="!flag">{{index+1}}楼</span>
          </span>
          <span style="color:#999;margin-left:20px">{{it.time}}</span>
          <div
            v-show="!flag"
            style="color:#999;position:absolute;right:25px;cursor:pointer"
            @click.stop="backsend(it)"
          >回复</div>
        </div>
      </template>
      <div style="color:#999;margin-left:50px">{{it.value}}</div>

      <div v-if="it.children" style="margin:20px 0 0 20px">
        <comment :comment="it.children" :userInfo="userInfo" :flag="true" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { getUser, getLocalTime } from "../plugins/utils";
import { addComment } from "../api";
export default {
  name: "comment",
  props: ["comment", "flag", "userInfo", "id"],
  methods: {
    backsend(it) {
      let permission = getUser();
      if (permission) {
        const usrId = this.userInfo.id;
        const avatar = this.userInfo.avatar;
        const name = this.userInfo.user;
        const value = this.textarea;
        const time = getLocalTime("yyyy-MM-dd h:m:s");
        this.$prompt(`回复${it.name}`, "输入", {
          confirmButtonText: "发送",
          cancelButtonText: "取消"
        })
          .then(({ value }) => {
            let arr = this.comment.filter(v => v == it);
            // window.console.log(arr)
            arr[0].children.push({
              avatar,
              name,
              value,
              time
            });
            addComment({ comment: this.comment, id: this.id });
          })
          .catch(() => {});
      } else {
        this.$message({
          type: "warning",
          duration: 1000,
          offset: 60,
          message: "你还没有登录"
        });
      }
    }
  },
  data() {
    return {
      activeName: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }
};
</script>

<style scoped>
</style>