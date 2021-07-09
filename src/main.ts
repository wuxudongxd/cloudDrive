import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// tailwind
import "./index.css";

// elementPlus
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

// v-viewer
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";

// svg-icons
import "virtual:svg-icons-register";

// NPlayer
import NPlayer from "@nplayer/vue";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(VueViewer)
  .use(NPlayer)
  .mount("#app");
