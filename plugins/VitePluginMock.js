const path = require("path");
const fs = require("fs");

const getMockData = (mockPath) => {
  // 因为不知道用户的目录是怎么样的，所以不能使用__dirname，一般项目运行在根目录，所以直接使用process.cwd()获得根目录
  const dirPath = path.resolve(process.cwd(), `./${mockPath}`);
  const mockStat = fs.statSync(dirPath);
  let mockData = [];
  if (mockStat.isDirectory()) {
    const children = fs.readdirSync(dirPath);
    children.forEach((child) => {
      const childPath = path.resolve(dirPath, `./${child}`);
      mockData.push(...(require(childPath) || []));
    });
  } else {
    mockData.push(...(require(dirPath) || []));
  }
  return mockData;
};

export default (options) => {
  // 做的最主要的事情就是拦截http请求
  const { mockPath = "mock" } = options || {};
  return {
    configureServer(server) {
      // 添加中间件
      server.middlewares.use((req, res, next) => {
        const mockData = getMockData(mockPath);
        const target = mockData.find(
          (item) => item.method === req.method && item.url === req.url
        );
        if (target) {
          res.writeHead(200, { "Content-type": "application/json" });
          res.end(JSON.stringify(target.response({})));
        } else {
          next();
        }
      });
    },
  };
};
