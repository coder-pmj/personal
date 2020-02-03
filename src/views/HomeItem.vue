<template>
  <div>
    <template v-show="itemtop.length">
      <el-card v-for="it in itemtop" :key="it.id" style="margin-bottom:15px">
        <div class="item-child">
          <a @click="goDetail(it)" class="item-a">{{it.title}}</a>
        </div>
        <div class="item-icon item-child item-icon-txt">
          <el-tag type="danger" class="item-icon-child" effect="dark" size="mini">推荐</el-tag>
          <span style="margin-left:20px">
            <i class="el-icon-date"></i>
            {{it.date}}
          </span>
          <span style="margin-left:20px">
            <i class="el-icon-view"></i>
            {{it.people}}
          </span>
          <span style="margin-left:20px">
            <i class="el-icon-chat-dot-square"></i>
            {{it.comment.length}}
          </span>
        </div>
        <el-image v-if="it.img" class="item-img item-child" :src="it.img" @load="successLoadTopImg"></el-image>
        <div class="item-text">{{it.text}}</div>
      </el-card>
    </template>

    <template v-show="item.length">
      <el-divider></el-divider>
      <el-card v-show="item.length">
        <div>最新日志</div>
      </el-card>
      <el-card v-for="it in item" :key="it.id">
        <div class="item-child">
          <a @click="goDetail(it)" class="item-a">{{it.title}}</a>
        </div>
        <div class="item-icon item-child item-icon-txt">
          <span>
            <i class="el-icon-date"></i>
            {{it.date}}
          </span>
          <span style="margin-left:20px">
            <i class="el-icon-view"></i>
            {{it.people}}
          </span>
          <span style="margin-left:20px">
            <i class="el-icon-chat-dot-square"></i>
            {{it.comment.length}}
          </span>
        </div>
        <el-image v-if="it.img" class="item-img item-child" :src="it.img" @load="successLoad"></el-image>
        <div class="item-text">{{it.text}}</div>
      </el-card>
    </template>

    <div v-loading="loading" class="bottom-wrap" ref="load">{{bottom}}</div>
  </div>
</template>

<script>
import { getItem, addPeople, delItem } from "../api";
import { getUser } from "../plugins/utils";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      flag: true,
      bottom: "",
      data: [],
      itemtop: [],
      loadItemTopflag: false,
      item: [],
      main: []
    };
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapState({
      info: state => state.loginUser.info
    }),
    user() {
      return this.info.length ? this.info[0].user : "";
    }
  },
  watch: {
    data(v) {
      if (v.length) {
        window.addEventListener("scroll", this.handleScroll);
      }
    },
    loadItemTopflag(v) {
      if (v) {
        //指定图片加载完成后才让加载下方的图片
        this.main = this.data.filter(v => !v.istop).reverse();
        this.item = this.main.slice(0, 1);
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    
    goDetail(obj) {
      addPeople(obj.id, obj.people).then(() => {
        // if (res.data.flag) {
        this.updatePeople(obj);
        window.open(`/detail?id=${obj.id}`);
      });
    },
    async initData() {
      let res = await getItem();
      this.data = res.data;

      this.itemtop = this.data.filter(v => v.istop);
    },
    updatePeople(obj) {
      if (obj.istop) {
        this.itemtop.forEach(v => {
          if (v.id === obj.id) {
            v.people++;
          }
        });
      } else {
        this.item.forEach(v => {
          if (v.id === obj.id) {
            v.people++;
          }
        });
      }
    },
    successLoadTopImg() {
      this.loadItemTopflag = true;
    },
    successLoad() {
      this.loading = false;
      this.flag = true;
    },
    load() {
      this.loading = true;
      if (this.item.length === this.data.length - this.itemtop.length) {
        this.loading = false;
        this.bottom = "到底啦";
        window.removeEventListener("scroll", this.handleScroll);
        return;
      }

      let timer = setTimeout(() => {
        this.item = this.main.slice(0, this.item.length + 1);

        clearTimeout(timer);
      }, 400);
    },

    handleScroll() {
      let viewHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let top = this.$refs.load.getBoundingClientRect().top;
      if (top > 0 && top < viewHeight) {
        if (this.flag) {
          this.flag = false;
          this.load();
        }
      }
    }
  }
};
</script>

<style scoped>
.el-card {
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}
.item-child {
  margin: 10px 0;
}
.item-a {
  text-decoration: none;
  font-size: 21px;
  color: #1890ff;
  cursor: pointer;
}
.item-a:hover {
  color: red;
}

.item-icon-txt {
  color: #ccc;
  font-size: 14px;
}

.item-text {
  text-indent: 2em;
  word-wrap: break-word;
  color: #999;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-clamp: 5;
}

.bottom-wrap {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
</style>