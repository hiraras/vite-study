const mockJS = require("mockjs");

const list = mockJS.mock({
  "data|100": [
    {
      name: "@cname", // 生成中文名
      ename: mockJS.Random.name(), // 生成英文名
      time: "@time", // 生成时间
      date: "@date", // 生成日期
      avatar: mockJS.Random.image("100x100"),
    },
  ],
});

module.exports = [
  {
    method: "POST",
    url: "/api/users",
    response: ({ body }) => {
      // body -> 请求体
      return {
        code: 0,
        msg: "success",
        ...list,
      };
    },
  },
];
