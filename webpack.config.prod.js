const merge = require("webpack-merge");
const baseConfig = require("./webpack.config-base");
const RemoveLogs = require("./removeLogs");
module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [new RemoveLogs()]
});
