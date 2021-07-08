import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";


import "virtual:svg-icons-register";


createApp(App).use(router).use(ElementPlus).mount("#app");