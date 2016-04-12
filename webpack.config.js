import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import variables, { defineVariables } from "./variables"

defineVariables()

export default {
  entry: [
    ...__DEV__ && [
      `webpack-dev-server/client?${ __SERVER_URL__ }`,
      "webpack/hot/dev-server",
    ],

    "./src/index.js",
  ],

  output: {
    path: path.join(__dirname, __OUTPUT_DIR__),
    publicPath: `${ __DEV__ ? __SERVER_URL__ : "" }/${ __OUTPUT_DIR__ }/`,
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

      // workaround to import Snap.svg as a module
      {
        test: require.resolve("snapsvg"),
        loader: "imports?this=>window,fix=>module.exports=0",
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin(variables),
    new ExtractTextPlugin("styles.css", { disable: __DEV__ }),

    ...__PROD__ && [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      })
    ],

    ...__DEV__ && [
      new webpack.HotModuleReplacementPlugin(),
    ],
  ],

  postcss: (webpack) => [
    require("stylelint"),
    require("postcss-import")({ addDependencyTo: webpack }),
    require("postcss-url"),
    require("postcss-cssnext"),
  ],
}
