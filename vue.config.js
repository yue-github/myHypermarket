const path = require("path");
 
function resolve(dir) {
  return path.join(__dirname, dir);
}
 
const name = "no";
 
module.exports = {
  lintOnSave: process.env.NODE_ENV === "development",
  // 路径别名
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "pages": resolve("./pages"),
        "@@": resolve("./static")
      }
    }
  }
};