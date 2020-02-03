import Vue from 'vue'
import Vuex from "vuex";
Vue.use(Vuex);
import setMusic from './setMusic'
import loginUser from './loginUser'
export default new Vuex.Store({
  modules: {
    setMusic,
    loginUser
  }
});
