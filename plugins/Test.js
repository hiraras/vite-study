module.exports = {
  config() {
    return {
      build: {
        assetsInlineLimit: 409600000, // 将图片大小小于该值的，转化为base64，默认为4kb
      },
    };
  },
};
