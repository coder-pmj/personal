<template>
  <div>
    <el-card style="margin-bottom:15px" v-show="flag">
      <div class="item-child">
        <a class="item-a">{{data.title}}</a>
      </div>

      <div class="item-icon item-child item-icon-txt">
        <el-avatar :size="50" :src="user.avatar"></el-avatar>

        <div style="margin-left:15px;line-height:30px;">
          <div style="font-weight:600;color:burlywood">
            {{user.user}}
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
              {{comment.length}}
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
          @keyup.ctrl.enter.native="send"
          @click.native="showSend=true"
          v-model="textarea"
        ></el-input>
        <div style="float:left;margin:20px 0;color:#999">ctrl+enter发布</div>
        <div style="float:right;margin:20px 0">
          <el-button size="mini" type="warning" round @click="send">发布</el-button>
          <el-button size="mini" round @click="textarea=''">取消</el-button>
        </div>

        <div style="margin-top:100px">
          <comment :comment="comment" :flag="false" :userInfo="userInfo" :id="data.id" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getDetail, getUserInfo, addComment } from "../api";
import { getUser, getLocalTime } from "../plugins/utils";

export default {
  name: "detail",
  components: {
    Comment: () => import("@/components/Comment")
  },
  data() {
    return {
      data: {}, //单页数据
      user: {},
      userInfo: {},
      comment: [],
      flag: false,
      textarea: "",
      activeName: []
    };
  },

  methods: {
    send() {
      let permission = getUser();
      if (this.info.length) {
        getUserInfo(this.info[0]).then(res => {
          this.userInfo = res.data[0];
          if (permission) {
            if (!this.userInfo.avatar) {
              this.$message({
                type: "warning",
                duration: 2000,
                offset: 60,
                message: "再设置一张头像叭"
              });
              return;
            }
            if (!this.textarea) {
              return;
            }
            const usrId = this.userInfo.id;
            const avatar = this.userInfo.avatar;
            const name = this.userInfo.user;
            const value = this.textarea;
            const time = getLocalTime("yyyy-MM-dd h:m:s");
            this.comment.push({
              avatar,
              name,
              value,
              time,
              children: []
            });
            addComment({ comment: this.comment, id: this.data.id }).then(() => {
              this.textarea = "";
            });
          } else {
            this.$message({
              type: "warning",
              duration: 1000,
              offset: 60,
              message: "你还没有登录"
            });
          }
        });
      }
    },
    getData(id) {
      getDetail(id).then(res => {
        let arr = res.data;
        this.data = arr[0];
        this.user = this.data.user[0];
        this.comment = Array.of(...this.data.comment);
        
      });
    }
  },
  computed: {
    ...mapState({
      info: state => state.loginUser.info
    })
  },
  created() {
    let id = this.$route.query.id;
    this.getData(id);
    if (this.info.length) {
      getUserInfo(this.info[0]).then(res => {
        this.userInfo = res.data[0];
      });
    }
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