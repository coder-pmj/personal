<template>
  <div>
    <template v-show="itemtop.length">
      <el-card v-for="it in itemtop" :key="it.id" style="margin-bottom:15px">
        <div class="item-child">
          <a @click="goDetail(it)" class="item-a">{{it.title}}</a>
        </div>
        <div class="item-icon item-child item-icon-txt">
          <el-tag type="danger" class="item-icon-child" effect="dark" size="mini">置顶</el-tag>
          <span style="margin-left:20px">
            <i class="el-icon-date"></i>
            {{it.date}}
          </span>
          <span style="margin-left:20px">
            <i class="el-icon-reading"></i>
            {{it.people}}人
          </span>
        </div>
        <el-image v-if="it.img" class="item-img item-child" :src="it.img"></el-image>
        <div class="item-text">{{it.text}}</div>
        <el-button type="mini" round class="item-detail" @click="goDetail(it)">
          <i class="el-icon-document"></i>
          <span>查看全文</span>
        </el-button>
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
            <i class="el-icon-reading"></i>
            {{it.people}}人
          </span>
        </div>
        <el-image v-if="it.img" class="item-img item-child" :src="it.img" @load="successLoad"></el-image>
        <div class="item-text">{{it.text}}</div>
        <el-button type="mini" round class="item-detail" @click="goDetail(it)">
          <i class="el-icon-document"></i>
          <span>查看全文</span>
        </el-button>
      </el-card>
    </template>

    <div v-loading="loading" class="bottom-wrap" ref="load">{{bottom}}</div>
  </div>
</template>

<script>
import { getItem, addPeople } from "../api";
export default {
  data() {
    return {
      loading: false,
      flag: true,
      bottom: "",
      data: [],
      itemtop: [],
      item: [],
      main: []
    };
  },
  created() {
    this.initData();
  },
  watch: {
    data(v) {
      if (v.length) {
        window.addEventListener("scroll", this.handleScroll);
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
        this.$router.push({ path: "/detail", query: { id: obj.id } });
        // }
      });
    },
    async initData() {
      let res = await getItem();
      this.data = res.data;
      this.itemtop = this.data.filter(v => v.istop);
      this.main = this.data.filter(v => !v.istop).reverse();
      this.item = this.main.slice(0, 1);
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
      },400);
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
.item-detail {
  float: right;
  margin-top: 10px;
}
.bottom-wrap {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
</style>