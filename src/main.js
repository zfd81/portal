import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import qs from "qs";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = qs;

//阻止启动生产消息,开发模式下为true,生产模式下为false
Vue.config.productionTip = true;

// Axios.defaults.baseURL = "/api";
//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// http请求拦截器
Axios.interceptors.request.use(
  config => {
    if (store.state.qaz) {
      config.headers[store.state.qaz] = store.state.wsx;
    }
    if (config.method == "post") {
      // config.data = qs.stringify(config.data);
    }
    // if (config.method == "delete") {
    //   config.data = qs.stringify(config.data, {
    //     arrayFormat: 'repeat'
    //   });
    //   alert(qs.stringify(config.data, {
    //     arrayFormat: 'repeat'
    //   }));
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http响应拦截器
Axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
