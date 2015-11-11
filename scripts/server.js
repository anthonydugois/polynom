import webpack from "webpack"
import webpackDevServer from "webpack-dev-server"
import config from "../webpack.config"

export default (options, callback) => {
    const compiler = webpack({
        ...config,
        entry: [
            ...(config.entry || []),
            `webpack-dev-server/client?${__SERVER_URL__}`,
            "webpack/hot/only-dev-server",
        ],
        plugins: [
            ...(config.plugins || []),
            new webpack.NoErrorsPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ],
        debug: true,
        watch: true,
        colors: true,
        progress: true,
    })

    const server = new webpackDevServer(compiler, {
        publicPath: `/${options.__OUTPUT_DIR__}/`,
        historyApiFallback: true,
        hot: true,
        noInfo: true,
        stats: {
            colors: true,
        },
    })

    server.listen(
        options.__SERVER_PORT__,
        options.__SERVER_HOST__,
        callback
    )
}
