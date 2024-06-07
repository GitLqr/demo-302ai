import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * 改为相对路径，解决 h5 打包后，不在网站根目录下时找不到资源问题
   * https://blog.csdn.net/vayne_1/article/details/130891358
   */
  base: "./",
  plugins: [uni()],
});
