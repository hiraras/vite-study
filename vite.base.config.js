import { defineConfig } from "vite";

// 为了保证代码提示的功能，对每个文件都是用defineConfig
export default defineConfig({
  optimizeDeps: {
    // exclude: ["lodash-es"], // 当遇到lodash-es这个包的时候，不进行依赖预构建(lodash-es这个包里边会export很多模块，各自为一个文件，如果不进行依赖预构建，会在加载的时候请求很多js文件)
  },
  envPrefix: ["VITE_", "BASE_"],
});
