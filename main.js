import "./index.module.less";

import _ from "lodash";
import lodashes from "lodash-es";
import { count } from "./src/js/count.js";
import "./src/js/component-loader.js";
import "./src/js/json-loader.js";
import "./src/js/imgLoader.js";
import "./src/js/svgLoader.js";

import "./src/ts/test";

console.log("count", count);

fetch("/api/users", {
  method: "post",
})
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

fetch("/api/tasks", {
  method: "post",
})
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
