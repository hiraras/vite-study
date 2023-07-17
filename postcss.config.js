// postcss打包过程实际还有许多插件要用到
// 例如降级插件、编译插件等
// 使用 postcss-preset-env 插件里边就包含了这些东西

const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [postcssPresetEnv(/* pluginOptions */)],
};
