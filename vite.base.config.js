import { defineConfig } from "vite";

const postcssPresetEnv = require("postcss-preset-env");

const path = require("path");

// 为了保证代码提示的功能，对每个文件都是用defineConfig
export default defineConfig({
  optimizeDeps: {
    // exclude: ["lodash-es"], // 当遇到lodash-es这个包的时候，不进行依赖预构建(lodash-es这个包里边会export很多模块，各自为一个文件，如果不进行依赖预构建，会在加载的时候请求很多js文件)
  },
  envPrefix: ["VITE_", "BASE_"],
  css: {
    preprocessorOptions: {
      // key + config，key代表预处理器的名
      less: {
        // 整个配置对象都会最终给到less的行参数（全局参数）
        math: "always", // 相当于 npx lessc --math="always" 'xxx.less'
        globalVars: {
          mainColor: "skyblue",
        },
      },
    },
    devSourcemap: true,
    postcss: {
      plugins: [
        postcssPresetEnv({
          importFrom: path.resolve(__dirname, "./variable.css"),
        }),
      ],
    },
  },
});
