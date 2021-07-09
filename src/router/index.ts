import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export let isLogin = localStorage.getItem("isLogin") === "true" ? true : false;
export const changeLogin = () => (isLogin = true);

router.beforeEach((to, from) => {
  if (isLogin && (to.path === "/login" || to.path === "/register")) {
    return "/";
  }
  if (!isLogin && to.path !== "/login" && to.path !== "/register") {
    return "/login";
  }
});

export default router;
