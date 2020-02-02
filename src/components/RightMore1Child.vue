<template>
  <div style="height:350px;">
    <div slot="header">
      <el-autocomplete
        autofocus
        placeholder="输入你想听的音乐"
        size="mini"
        v-model="input"
        @keyup.native.enter="search"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
    </div>

    <el-divider content-position="left">{{input?'搜索结果':'热度排行前十'}}</el-divider>
    <!--
    搜索结果
    -->
    <div class="result" id="result">
      <template v-if="input">
        <div
          :class="{'list':true,'newbg':isplaying&&playingMusic.id===it.id}"
          v-for="(it,i) in resultMusic"
          :key="it.id"
          @click.stop="add(it)"
        >
          <el-col :span="22" class="name">
            <span style="margin-right:10px;color:red">{{i+1}}</span>
            {{it.name}}
          </el-col>
        </div>
      </template>

      <template v-else>
        <div
          :class="{'list':true,'newbg':isplaying&&playingMusic.id===it.id}"
          v-for="(it,i) in hotMusic"
          :key="it.id"
          @click.stop="add(it)"
        >
          <el-col :span="22" class="name">
            <span style="margin-right:10px;color:red">{{i+1}}</span>
            {{it.name}}
          </el-col>

          <img
            src="../assets/hot.png"
            width="20"
            :alt="it.searchnum"
            style="margin-right:0px;outline:none"
          />
        </div>
      </template>
    </div>

    <!--end-->
    <el-divider></el-divider>
    <div class="controls">
      <el-tooltip
        v-show="playingMusic.name"
        :content="playingMusic.name"
        placement="bottom"
        effect="light"
      >
        <div class="title">{{playingMusic.name}}</div>
      </el-tooltip>
      <div class="title" v-show="!playingMusic.name">{{'未知'}}</div>

      <el-tooltip content="上一首" placement="bottom" effect="light">
        <i class="el-icon-d-arrow-left" @click="prep" style="cursor:pointer;font-size:20px"></i>
      </el-tooltip>
      <el-tooltip content="下一首" placement="bottom" effect="light">
        <i
          class="el-icon-d-arrow-right"
          @click="next"
          style="margin-right:6px;cursor:pointer;font-size:20px"
        ></i>
      </el-tooltip>
      <img
        :src="loop?require('../assets/loop.png'):require('../assets/order.png')"
        width="20"
        @click="loop=!loop"
        style="margin-right:6px;outline:none"
      />

      <div>
        <i
          v-show="!isplaying"
          style="font-size:25px;font-weight:400;"
          @click.stop="toogle"
          class="el-icon-video-play"
        ></i>

        <i
          v-show="isplaying"
          style="font-size:25px;font-weight:400;"
          @click.stop="toogle"
          class="el-icon-video-pause"
        ></i>
      </div>
    </div>
    <!--


    -->
    <audio ref="musicBox" :loop="loop">
      <source :src="src" />
    </audio>
  </div>
</template>

<script>
import {
  getMusic,
  getNextMusic,
  addSearchNum,
  getHotMusic,
  getPrepMusic,
  getAllMusic
} from "../api";
import { Message } from "element-ui";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loop: false,
      input: ""
    };
  },
  props: {
    tipflag: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    ...mapState({
      data: state => state.setMusic.data,
      isplaying: state => state.setMusic.isplaying,
      src: state => state.setMusic.src,
      hotMusic: state => state.setMusic.hotMusic,
      resultMusic: state => state.setMusic.resultMusic,
      playingMusic: state => state.setMusic.playingMusic,
      played: state => state.setMusic.played
    })
  },
  methods: {
    async querySearch(queryString, cb) {
      let input = this.input;
      if (this.data.length) {
        let results = this.data.filter(
          v => v.name.toLowerCase().indexOf(input.toLowerCase()) === 0
        );
        results.forEach(v => {
          v.value = v.name;
        });
        cb(results);
      } else {
        let res = await getAllMusic();
        // this.data = res.data;
        this.$store.commit("setMusic/setData", res.data);
        this.querySearch(queryString, cb);
        return;
      }
    },
    handleSelect() {
      this.search();
    },
    //添加到音乐栏
    async add(it) {
      if (this.isplaying && this.playingMusic.id === it.id) return;
      this.$store.commit("setMusic/isplayed"); //每次添加新的音乐都将状态置为暂停
      // this.isplaying = false;
      //如果已经加载了音乐，将它暂停
      if (this.playingMusic.name) {
        this.pause();
      }
      //将点击的音乐加载
      // this.playingMusic = it;
      this.$store.commit("setMusic/setPlayingMusic", it);
      this.load(it.name);

      //播放
      this.play();
      Message.closeAll();
      if (this.input) {
        addSearchNum(it.id, it.searchnum);
      }
    },
    //加载歌曲
    load(name) {
      // this.played.push(this.playingMusic.id);
      this.$store.commit("setMusic/addplayed", this.playingMusic.id);
      // this.src = "/api/music/" + encodeURI(name) + ".mp3";
      this.$store.commit(
        "setMusic/setSrc",
        "/api/music/" + encodeURI(name) + ".mp3"
      );
      this.$refs.musicBox.load();
    },
    //状态切换
    toogle() {
      Message.closeAll();
      //如果已经有歌才允许切换
      if (this.playingMusic.name) {
        if (!this.isplaying) {
          this.play();
        } else {
          this.pause();
        }
        // this.isplaying = !this.isplaying;
        this.$store.commit("setMusic/toogle");
      }
    },
    play() {
      let musicBox = this.$refs.musicBox;
      musicBox.play();
    },
    pause() {
      let musicBox = this.$refs.musicBox;
      musicBox.pause();
    },
    //搜索
    search() {
      if (this.input) {
        getMusic(this.input).then(res => {
          // this.resultMusic = res.data;
          this.$store.commit("setMusic/setResultMusic", res.data);
        });
      }
    },
    //上一首
    async prep() {
      Message.closeAll();
      let musicBox = this.$refs.musicBox;
      let res = await getPrepMusic(this.playingMusic.id);
      // this.playingMusic = res.data[0];
      this.$store.commit("setMusic/setPlayingMusic", res.data[0]);
      // window.console.log(this.playingMusic.name);
      this.load(this.playingMusic.name);
      musicBox.play();
    },
    //播放下一首
    async next() {
      Message.closeAll();
      let musicBox = this.$refs.musicBox;
      let res = await getNextMusic(this.playingMusic.id);
      // this.playingMusic = res.data[0];
      this.$store.commit("setMusic/setPlayingMusic", res.data[0]);
      // window.console.log(this.playingMusic.name);
      this.load(this.playingMusic.name);
      musicBox.play();
    },
    handlePlaying() {
      Message.closeAll();
      let musicBox = this.$refs.musicBox;
      let time = musicBox.duration * 1000;
      // this.isplaying = true;
      this.$store.commit("setMusic/playing");
      if (this.tipflag) {
        Message({
          dangerouslyUseHTMLString: true,
          message: `   正在播放   <strong style="color:red">${this.playingMusic.name}</strong>`,
          offset: 60,
          showClose: true,
          duration: time - 2000
        });
      }
    },
    handlePaused() {
      // this.isplaying = false;
      this.$store.commit("setMusic/isplayed");
      Message.closeAll();
    },
    handleended() {
      // this.isplaying = false;
      this.$store.commit("setMusic/isplayed");
      if (this.loop) {
        return;
      }
      this.next();
    },
    getHotData() {
      getHotMusic().then(res => {
        this.$store.commit("setMusic/setHotMusic", res.data);
        // this.hotMusic = res.data;
      });
    }
  },
  mounted() {
    this.getHotData();
    let musicBox = this.$refs.musicBox;
    musicBox.addEventListener("playing", this.handlePlaying);
    musicBox.addEventListener("paused", this.handlePaused);
    musicBox.addEventListener("ended", this.handleended);
  },
  beforeDestroy() {
    let musicBox = this.$refs.musicBox;
    musicBox.removeEventListener("playing", this.handlePlaying);
    musicBox.removeEventListener("paused", this.handlePaused);
    musicBox.removeEventListener("ended", this.handleended);
  },
  watch: {
    input(v) {
      if (!v) {
        // this.resultMusic = [];
        this.$store.commit("setMusic/setResultMusic", []);
        this.getHotData();
      }
    },
    loop(v){
      if(v){
        
      }
    }
  }
};
</script>

<style scoped>
.newbg {
  background-image: url("../assets/playing.gif");
}
.el-button {
  padding: 3px;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 11px 0;
}
.title {
  color: cadetblue;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.result {
  height: 256px;
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: white;
}

.result::-webkit-scrollbar {
  display: none;
}
.list {
  display: flex;
  align-items: center;
  margin: 6px 0;
  background-color: rgb(248, 245, 245);
  padding: 2px 5px;
  border-radius: 10px;
  cursor: pointer;
}
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: beige;
  padding: 0 10px;
  border-radius: 10px;
}
</style>