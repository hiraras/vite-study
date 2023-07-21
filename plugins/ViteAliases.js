// vite的插件必须返回一个配置对象

const path = require("path");
const fs = require("fs");

const getFolders = (dirList = [], basePath) => {
  return dirList.filter((dir) => {
    const stat = fs.statSync(path.resolve(__dirname, `${basePath}/${dir}`));
    return stat.isDirectory();
  });
};

const getResolveAlias = (basePath = "") => {
  const dirs = fs.readdirSync(path.resolve(__dirname, basePath));
  const folders = getFolders(dirs, basePath);
  const alias = folders.reduce(
    (prev, folder) => {
      return {
        ...prev,
        [`@${folder}`]: path.resolve(__dirname, `${basePath}/${folder}`),
      };
    },
    {
      "@": path.resolve(__dirname, basePath),
    }
  );
  return alias;
};

module.exports = () => {
  return {
    // config 函数可以返回一个对象，这个对象是部分的viteConfig配置
    config(config, env) {
      //   console.log(config, env);
      // config: 目前的配置对象
      // env: {mode, command, ssrBuild}
      // mode 为环境（production），command为执行的命令（dev，build）,ssrBuild 跟服务端渲染有关
      const alias = getResolveAlias("../src");
      return {
        resolve: {
          alias,
        },
      };
    },
  };
};
