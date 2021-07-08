import { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    children: [
      {
        path: "/",
        name: "file",
        component: () => import("@/views/file/index.vue"),
      },
      {
        path: "/recently",
        name: "recently",
        component: () => import("@/views/file/recently.vue"),
      },
      {
        path: "/collection",
        name: "collection",
        component: () => import("@/views/file/collection.vue"),
      },
      {
        path: "/share",
        name: "share",
        component: () => import("@/views/file/share.vue"),
      },
      {
        path: "/music",
        name: "music",
        component: () => import("@/views/file/music.vue"),
      },
      {
        path: "/picture",
        name: "picture",
        component: () => import("@/views/file/picture.vue"),
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/file/video.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/authentication/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/authentication/register.vue"),
  },
];
