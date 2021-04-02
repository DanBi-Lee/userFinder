const path = require("path");
const HtmlWebpaclPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "PRODUCTION";
const postcssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      config: path.resolve(__dirname, "postcss.config.js"),
    },
  },
};

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  plugins: [
    new HtmlWebpaclPlugin({
      template: "./src/index.html",
      minify: isProduction
        ? {
            collapseWhitespace: true,
            useShortDoctype: true,
            removeScriptTypeAttributes: true,
          }
        : false,
    }),
    new webpack.DefinePlugin({
      IS_PRODUCTION: isProduction,
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      // filename.module.scss => css modules
      // filename.scss => global
      {
        test: /\.s?css$/i,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
              postcssLoader,
              "sass-loader",
            ],
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              postcssLoader,
              "sass-loader",
            ],
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name() {
                if (!isProduction) {
                  return "[path][name].[ext]";
                }
                return "[contenthash].[ext]";
              },
              publicPath: "images/",
              outputPath: "images/",
            },
          },
        ],
      },
    ],
  },
};
