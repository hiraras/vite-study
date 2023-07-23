module.exports = (options) => {
  return {
    // html是原始的html文件内容，ctx为请求的执行上下文 methods,url,header。。。
    // 这个钩子可能执行时机比较晚，就可能导致其他读取html的插件读到 <%= title %> 然后报错，因此需要将它的执行时机提前
    // transformIndexHtml(html, ctx) {
    //   return html.replace(/<%= title %>/g, options.inject.data.title);
    // },
    transformIndexHtml: {
      enforce: "pre",
      transform(html, ctx) {
        return html.replace(/<%= title %>/g, options.inject.data.title);
      },
    },
  };
};
