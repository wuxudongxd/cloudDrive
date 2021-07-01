import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import viteSvgIcons from "vite-plugin-svg-icons";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), //设置别名
    },
  },
  plugins: [
    vue(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icon/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
});
