const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.common");

const config = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    open: true,
    hot: true,
    port: 3000,
  },
  target: "web",
};

module.exports = merge(webpackCommon, config);
