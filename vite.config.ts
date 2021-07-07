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
  server: {
    port: 3000,
    open: false, //自动打开
    base: "./ ", //生产环境路径
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      "^/api": {
        target: "http://116.63.172.108:8080", // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
