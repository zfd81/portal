// 我们组装模块并导出 store 的地方
import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qaz: null,
    wsx: null,
    user: {},
    sourceViewName: ""
  },
  mutations: mutations,
  actions: actions,
  modules: {}
});
