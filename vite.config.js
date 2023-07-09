import { defineConfig } from "vite";
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";

// 策略模式
// 这里采用返回一个函数的形式，是为了可能在调试的时候需要打印些东西
const envResolver = {
  build: () => ({ ...viteBaseConfig, ...viteProdConfig }),
  serve: () => ({ ...viteBaseConfig, ...viteDevConfig }),
};

export default defineConfig(({ command }) => {
  console.log("command:", command);
  return envResolver[command]();
});

/** @type import('vite').UserConfig */
const viteConfig = {};
