const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "venders",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
};

module.exports = merge(webpackCommon, config);
