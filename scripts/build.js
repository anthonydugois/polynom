import webpack from "webpack"
import webpackDevServer from "webpack-dev-server"
import color from "chalk"
import opn from "opn"
import config from "../webpack.config"
import { defineVariables } from "../variables"

defineVariables()

if (__PROD__) {
  webpack(config, (err) => {
    if (err) {
      throw err
    }

    console.log(color.green("\n✓ Build successfully completed"))
  })
} else {
  const server = new webpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
  })

  server.listen(__SERVER_PORT__, __SERVER_HOST__, (err) => {
    if (err) {
      throw err
    }

    opn(__SERVER_URL__)

    console.log(color.green(`\n✓ Dev server started on ${ __SERVER_URL__ }`))
  })
}
