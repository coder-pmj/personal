<template>
  <el-card class="personal" style="height:338px" ref="personal">
    <div
      @click="exit"
      style="width:10px;height:10px;position:absolute;right:15px;top:10px;font-size:20px;cursor:pointer"
    >
      <i class="el-icon-close"></i>
    </div>
    <el-row type="flex" justify="center">
      <el-upload
        ref="upload"
        :on-change="AvatarChange"
        action
        :auto-upload="false"
        :show-file-list="false"
      >
        <el-avatar v-if="avatar" :size="90" :src="avatar"></el-avatar>
        <el-avatar v-else :size="90" :src="data.avatar"></el-avatar>
      </el-upload>
    </el-row>
    <el-row type="flex" class="author-info" justify="center">
      <div style="color: #1890ff;font-size:22px">{{data.user}}</div>

      <p>
        <template>
          <el-input
            v-if="isEdit"
            ref="saveTxtInput"
            @blur="handleAdd"
            @keyup.enter.native="handleAdd"
            placeholder="输入你的个性化语句"
            v-model="txt"
            size="mini"
          ></el-input>
          <span
            v-else
            @click="showInput2"
            style="color: #999;cursor:pointer;font-size:14px"
          >{{txt||data.text||'点击编辑状态'}}</span>
        </template>
      </p>
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
        <el-tooltip :content="localqq||data.qq" placement="top">
          <img class="img" :src="qq" width="25" alt="qq" @click="showDialog('qq')" />
        </el-tooltip>
        <el-tooltip :content="localwx||data.wx" placement="top">
          <img class="img" :src="wx" width="25" alt="wx" @click="showDialog('微信')" />
        </el-tooltip>
        <el-tooltip :content="localdy||data.dy" placement="top">
          <img class="img" :src="dy" width="25" alt="dy" @click="showDialog('抖音')" />
        </el-tooltip>
      </div>
    </el-row>
  </el-card>
</template>


<script>
import { mapState } from "vuex";
import {
  getUserInfo,
  uploadAvatar,
  updateTags,
  updateText,
  updateCircle
} from "../api";
import { removeUser } from "../plugins/utils";
export default {
  data() {
    return {
      visible: false,
      data: [],
      inputVisible: false,
      inputValue: "",
      qq: require("../assets/QQ.png"),
      wx: require("../assets/wx.png"),
      dy: require("../assets/dy.png"),
      localqq: "",
      localwx: "",
      localdy: "",
      dynamicTags: [],
      avatar: "",
      isEdit: false,
      txt: ""
    };
  },
  computed: {
    ...mapState({
      info: state => state.loginUser.info
    })
  },

  created() {
    getUserInfo(this.info[0]).then(res => {
      this.data = res.data[0];

      this.data.qq ? (this.localqq = this.data.qq) : "";
      this.data.wx ? (this.localwx = this.data.wx) : "";
      this.data.dy ? (this.localdy = this.data.dy) : "";
      if (this.data.tag) {
        this.dynamicTags = JSON.parse(this.data.tag);
      }
    });
  },
  methods: {
    showDialog(type) {
      const userId = this.data.id;
      this.$prompt(`请输入${type}号`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          switch (type) {
            case "qq":
              this.localqq = value;
              break;
            case "微信":
              this.localwx = value;
              break;
            case "抖音":
              this.localdy = value;
              break;
          }
          updateCircle({
            userId,
            qq: this.localqq,
            wx: this.localwx,
            dy: this.localdy
          });
        })
        .catch(() => {});
    },
    handleAdd() {
      let txt = this.txt;
      const userId = this.data.id;

      if (txt.length > 28) {
        this.$message({
          duration: 800,
          offset: 60,
          message: "字数过多",
          type: "warning"
        });
        this.$refs.saveTxtInput.focus();
      } else {
        this.isEdit = false;
        if (!txt.length) {
          this.txt="点击编辑状态"
          updateText({ userId, txt: "" });
          return;
        }
        F;
        updateText({ userId, txt });
      }
    },
    AvatarChange(file, filelist) {
      const userId = this.data.id;
      // window.console.log(userId);
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        this.avatar = reader.result;
        uploadAvatar({
          ...file,
          dataUrl: reader.result,
          userId
        });
      };
    },

    exit() {
      this.$confirm("确认退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("loginUser/setInfo", []);
          removeUser();
          this.$refs.personal.style.transform = "360deg";
        })
        .catch(() => {});
    },
    handleClose(tag) {
      const userId = this.data.id;
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      updateTags({ userId, data: this.dynamicTags });
    },

    showInput() {
      if (this.dynamicTags.length < 6) {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.focus();
        });
      }
    },
    showInput2() {
      this.isEdit = true;
      this.$nextTick(() => {
        this.$refs.saveTxtInput.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      const userId = this.data.id;
      let flag = this.dynamicTags.some(v => v.title == inputValue);
      if (!flag) {
        if (inputValue && inputValue.length <= 10) {
          this.dynamicTags.push({ title: inputValue });
          //发送网络请求
          updateTags({ userId, data: this.dynamicTags });
        }
        this.inputVisible = false;
        this.inputValue = "";
      } else {
        this.$message({
          duration: 800,
          offset: 60,
          message: "标签重复",
          type: "error"
        });
      }
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
  outline: none;
  cursor: pointer;
}
</style>