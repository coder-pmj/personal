import Vue from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// import './plugins/filter'
// window.console.log([])
Vue.config.productionTip = false;
window.console.log('音乐素材收集于抖音短视频转换的mp3格式、手机铃声库。如有侵权请联系作者删除 qq:1367559786')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
