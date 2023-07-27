import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import MyViteAliases from "./plugins/ViteAliases";
import TestPlugin from "./plugins/Test";
import CreateHtmlPlugin from "./plugins/CreateHtmlPlugin";
import { viteMockServe } from "vite-plugin-mock";
import VitePluginMock from "./plugins/VitePluginMock";
import Checker from "vite-plugin-checker";

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
          importFrom: path.resolve(__dirname, "./css/variable.css"),
        }),
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    rollupOptions: {
      // 配置rollup的一些构建策略
      output: {
        // ext为拓展名，name为文件名，hash代表将你的文件名和文件内容进行组合计算的结果
        assetFileNames: "[hash].[name].[ext]",
      },
    },
    assetsInlineLimit: 4096, // 将图片大小小于该值的，转化为base64，默认为4kb
    outDir: "dist", // 打包输出目录
    assetsDir: "static", // 静态资源的目录
    emptyOutDir: true, // 清除输出目录中的所有文件
  },
  plugins: [
    MyViteAliases(),
    TestPlugin,
    CreateHtmlPlugin({
      inject: {
        data: {
          title: "home",
        },
      },
    }),
    // viteMockServe(),
    VitePluginMock({ mockPath: "mock" }),
    {
      configResolved(options) {
        // console.log("configResolved options", options);
      },
      options(options) {
        // console.log("rollup options", options);
      },
      buildStart(fullRollupOptions) {
        // console.log("fullRollupOptions", fullRollupOptions);
      },
    },
    Checker({
      typescript: true,
    }),
  ],
});
