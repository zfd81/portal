import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Home from "../views/Home.vue";
import Login from "@/views/Login";

Vue.use(VueRouter);

// 解决两次访问相同路由地址报错
const routerPush = VueRouter.prototype.push;
// VueRouter.prototype.push = location => {
//   return routerPush.call(this, location).catch(error => error);
// };

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登陆"
    },
    component: Login
  },
  {
    path: "/p",
    name: "Home",
    meta: {
      requireAuth: false,
      title: "portal"
    },
    component: resolve => require(["@/views/Home"], resolve)
  },
  {
    path: "/prescription",
    name: "Prescription",
    meta: {
      requireAuth: false,
      title: "处方"
    },
    component: resolve => require(["@/views/prescription/Index"], resolve)
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history", // 使用 HTML5 的 History 路由模式
  routes
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (to.name == "Login") {
      next();
    } else if (store.state.wsx) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default router;
