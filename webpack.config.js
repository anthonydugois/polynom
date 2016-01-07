import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import postcssImport from "postcss-import"
import postcssUrl from "postcss-url"
import postcssNext from "postcss-cssnext"
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
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint",
      },
      {
        test: /\.css$/,
        loader: "stylelint",
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
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
    ...(__PROD__ ?
      [new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      })] :
      []
    ),
  ],
  eslint: {
    configFile: path.join(__dirname, "./.eslintrc"),
  },
  stylelint: {
    configFile: path.join(__dirname, "./.stylelintrc"),
  },
  postcss: (webpack) => {
    return [
      postcssImport({ addDependencyTo: webpack }),
      postcssUrl,
      postcssNext,
    ]
  },
}
