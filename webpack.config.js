import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import variables, { defineVariables } from "./variables"

defineVariables()

export default {
  entry: ["./src/index.js"],

  output: {
    path: path.join(__dirname, __OUTPUT_DIR__),
    publicPath: `${ __SERVER_URL__ }/${ __OUTPUT_DIR__ }/`,
    filename: "bundle.js",
  },

  resolve: {
    extensions: ["", ".js", ".css"],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel", "eslint"],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css!postcss"),
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin(variables),
    new ExtractTextPlugin("styles.css", { disable: __DEV__ }),

    ...__PROD__ && [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      })
    ],
  ],

  postcss: (webpack) => [
    require("stylelint"),
    require("postcss-import")({ addDependencyTo: webpack }),
    require("postcss-url"),
    require("postcss-cssnext"),
  ],
}
