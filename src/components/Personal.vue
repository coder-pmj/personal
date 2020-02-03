<template>
  <el-card class="personal">
    <div
      @click="exit"
      style="width:10px;height:10px;position:absolute;right:15px;top:10px;font-size:20px;cursor:pointer"
    >
      <i class="el-icon-close"></i>
    </div>
    <el-row type="flex" justify="center">
      <el-avatar :size="90" :src="data.avatar"></el-avatar>
    </el-row>
    <el-row type="flex" class="author-info" justify="center">
      <div style="color: #1890ff;">{{data.user}}</div>
      <p v-show="!isEdit" style="color: #999;font-size:0.9rem">{{data.text||'编辑状态'}}</p>
      <el-input v-show="isEdit" type="text"></el-input>
      <div style="text-align:center">
        <el-tag
          :key="tag.title"
          v-for="tag in dynamicTags"
          closable
          size="mini"
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag.title}}</el-tag>
        <template v-if="dynamicTags.length<6">
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            placeholder="输入一个最长为10字符的tag"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <i
            v-else
            class="el-icon-circle-plus-outline"
            style="cursor:pointer;color:blue"
            @click="showInput"
          ></i>
        </template>
      </div>
      <el-divider content-position="center">社交账号</el-divider>
      <div>
        <el-tooltip :content="data.qq" placement="top">
          <img class="img" :src="qq" width="25" alt="qq" />
        </el-tooltip>
        <el-tooltip :content="data.wx" placement="top">
          <img class="img" :src="wx" width="25" alt="wx" />
        </el-tooltip>
        <el-tooltip :content="data.dy" placement="top">
          <img class="img" :src="dy" width="25" alt="dy" />
        </el-tooltip>
      </div>
    </el-row>
  </el-card>
</template>


<script>
import { mapState } from "vuex";
import { getUserInfo } from "../api";
import { removeUser } from "../plugins/utils";
export default {
  data() {
    return {
      data: [],
      inputVisible: false,
      inputValue: "",
      img: "/api/img/avatar.jpg",
      qq: require("../assets/QQ.png"),
      wx: require("../assets/wx.png"),
      dy: require("../assets/dy.png"),
      dynamicTags: []
    };
  },
  computed: {
    ...mapState({
      info: state => state.loginUser.info
    })
  },
  created() {
    // window.console.log(...this.info);
    getUserInfo(this.info[0]).then(res => {
      this.data = res.data[0];
      if (this.data.tag) {
        this.dynamicTags = JSON.parse(this.data.tag);
      }
      // window.console.log(this.data);
    });
  },
  methods: {
    exit() {
      this.$confirm("确认退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("loginUser/setInfo", []);
          removeUser();
        })
        .catch(() => {});
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      if (this.dynamicTags.length < 6) {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      }
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue && inputValue.length <= 10) {
        this.dynamicTags.push({ title: inputValue });
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style scoped>
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