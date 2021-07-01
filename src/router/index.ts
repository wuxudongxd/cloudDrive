import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 登录/注册  路由守卫
export let isLogin = localStorage.getItem("isLogin") === "true" ? true : false;
router.beforeEach((to, from) => {
  // console.log(to.path);
  // console.log(typeof isLogin);
  // if (isLogin && (to.path === "/login" || to.path === "/register")) {
  //   return "/";
  // }
  // if (!isLogin && to.path !== "/login" && to.path !== "/register") {
  //   return "/login";
  // }
});

export default router;
