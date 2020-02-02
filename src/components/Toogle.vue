<template>
  <div class="toogle">
    <i v-show="flag" class="el-icon-s-operation" @click="musicflag=!musicflag"></i>
    <el-dialog
      title="音乐盒"
      :visible.sync="musicflag"
      width="85%"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <right-more1-child :tipflag="false" />
    </el-dialog>
  </div>
</template>

<script>
import RightMore1Child from "@/components/RightMore1Child";
export default {
  components: {
    RightMore1Child
  },
  data() {
    return {
      flag: false,
      musicflag: false
    };
  },
  mounted() {
    this.updateflags();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    updateflags() {
      let wid = document.body.offsetWidth + 16;
      if (wid <= 1200) {
        this.flag = true;
        this.musicflag = true;
      } else {
        this.flag = false;
        this.musicflag = false;
      }
    },
    handleResize() {
      let wid = document.body.offsetWidth + 16;
      if (wid <= 1200) {
        (() => {
          if (!this.flag) {
            this.flag = true;
          }
        })();
      } else {
        (() => {
          if (this.flag) {
            this.flag = false;
          }
          if (this.musicflag) {
            this.musicflag = false;
          }
        })();
      }
    }
  },
  watch: {
    musicflag(v) {
      if (v) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>

<style scoped>
.toogle {
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1001;
  font-size: 25px;
  color: purple;
}
</style>