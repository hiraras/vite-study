import { defineConfig, loadEnv } from "vite";
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";

// 策略模式
// 这里采用返回一个函数的形式，是为了可能在调试的时候需要打印些东西
const envResolver = {
  build: () => ({ ...viteBaseConfig, ...viteProdConfig }),
  serve: () => ({ ...viteBaseConfig, ...viteDevConfig }),
};

export default defineConfig(({ command, mode }) => {
  console.log("command:", command);
  console.log("mode:", mode);
  // process.cwd() 返回当前node进程的工作目录
  // 第三个参数是注入的变量名前缀，默认是"VITE_"，即变量名为VITE_开头的变量会被注入
  // 可以传入一个数组，以匹配多种变量名
  const env = loadEnv(mode, process.cwd(), ["BASE_", "VITE_"]);
  console.log("env", env);
  return envResolver[command]();
});

/** @type import('vite').UserConfig */
const viteConfig = {};
